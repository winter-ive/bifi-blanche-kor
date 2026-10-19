// Notion CMS 통합 — 빌드 시점에 Database 조회 + 이미지 로컬 캐싱 + 블록 → HTML 변환
// 환경변수: NOTION_TOKEN, NOTION_DATABASE_ID (.env)

import { Client } from "@notionhq/client";
import { createHash } from "node:crypto";
import { mkdir, writeFile, stat } from "node:fs/promises";
import { join } from "node:path";

// Astro dev와 build 모두에서 작동하도록 양쪽 env source 확인
const NOTION_TOKEN =
  import.meta.env.NOTION_TOKEN || process.env.NOTION_TOKEN;
const DB_ID =
  import.meta.env.NOTION_DATABASE_ID || process.env.NOTION_DATABASE_ID;

if (!NOTION_TOKEN) {
  throw new Error("NOTION_TOKEN이 설정되지 않았습니다. .env 파일을 확인하고 dev 서버를 재시작하세요.");
}
if (!DB_ID) {
  throw new Error("NOTION_DATABASE_ID가 설정되지 않았습니다. .env 파일을 확인하세요.");
}

const notion = new Client({ auth: NOTION_TOKEN });

// Database 속성 이름 — 노션 Database와 정확히 일치해야 함
const PROP = {
  title: "Title",
  date: "발행일",
  thumbnail: "Thumbnail",
  status: "Status",
  slug: "Slug",
};

// 이미지 저장 경로 — public/notion-images/ 에 캐시
const IMG_DIR = join(process.cwd(), "public", "notion-images");

// --------- Property helpers ---------
const getText = (richText) =>
  (richText || []).map((t) => t.plain_text).join("");

const getProp = (page, name) => page.properties[name];

const getTitle = (page) => getText(getProp(page, PROP.title)?.title);
const getDate = (page) => getProp(page, PROP.date)?.date?.start || "";
const getStatus = (page) => getProp(page, PROP.status)?.select?.name || "";
const getSlugRaw = (page) => getText(getProp(page, PROP.slug)?.rich_text);
const getThumbnailUrl = (page) => {
  const f = getProp(page, PROP.thumbnail)?.files?.[0];
  if (!f) return null;
  return f.type === "external" ? f.external.url : f.file?.url;
};

// Slug 비어있으면 page ID의 뒷부분으로 자동 생성
export const slugify = (page) => {
  const custom = getSlugRaw(page).trim();
  if (custom) return custom;
  // Notion page ID (uuid) 의 last chunk → URL-safe short slug
  return page.id.replace(/-/g, "").slice(-12);
};

// --------- Image caching ---------
// Notion 이미지 URL은 1시간 만료 → 빌드 시점에 다운로드해서 public/ 에 저장
async function cacheImage(url, hintName = "") {
  if (!url) return null;
  // URL에서 쿼리 제외한 경로 기반 해시로 고유 파일명
  const urlPath = url.split("?")[0];
  const ext = (urlPath.match(/\.([a-zA-Z0-9]+)$/)?.[1] || "jpg").toLowerCase();
  const hash = createHash("sha1").update(urlPath).digest("hex").slice(0, 16);
  const filename = `${hash}.${ext}`;
  const localPath = join(IMG_DIR, filename);
  const publicPath = `/notion-images/${filename}`;

  try {
    await stat(localPath);
    return publicPath; // 이미 캐시됨
  } catch {
    // 다운로드 필요
  }

  try {
    await mkdir(IMG_DIR, { recursive: true });
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`[notion] image fetch failed ${res.status}: ${hintName}`);
      return null;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(localPath, buf);
    return publicPath;
  } catch (e) {
    console.warn("[notion] image cache error:", e.message);
    return null;
  }
}

// --------- Rich text → HTML ---------
// 허용 annotation: bold, underline, 색상(highlight)만. italic/strikethrough는 유지.
function richTextToHtml(richText) {
  return (richText || [])
    .map((rt) => {
      let text = escapeHtml(rt.plain_text);
      const a = rt.annotations || {};
      if (a.bold) text = `<strong>${text}</strong>`;
      if (a.italic) text = `<em>${text}</em>`;
      if (a.strikethrough) text = `<s>${text}</s>`;
      if (a.underline) text = `<u>${text}</u>`;
      // 노션 color: foreground 또는 background. background_* 는 highlight 로 처리
      if (a.color && a.color !== "default") {
        if (a.color.endsWith("_background")) {
          text = `<mark>${text}</mark>`;
        }
        // foreground color는 사이트 디자인상 무시 (글자 색 커스터마이즈 X)
      }
      // 링크
      if (rt.href) text = `<a href="${escapeAttr(rt.href)}" target="_blank" rel="noopener">${text}</a>`;
      return text;
    })
    .join("");
}

function escapeHtml(s) {
  return (s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
function escapeAttr(s) {
  return escapeHtml(s).replace(/"/g, "&quot;");
}

// --------- Blocks → HTML ---------
// 지원 block 타입만 허용. 나머지는 평문/무시.
// heading_1/2/3 모두 하나의 h2 레벨로 통일 (사용자 요구: "h1-6중 하나만")
async function blockToHtml(block) {
  const type = block.type;
  const data = block[type];

  switch (type) {
    case "paragraph":
      return `<p>${richTextToHtml(data.rich_text)}</p>`;

    case "heading_1":
    case "heading_2":
    case "heading_3":
      return `<h2>${richTextToHtml(data.rich_text)}</h2>`;

    case "bulleted_list_item":
      return `<li>${richTextToHtml(data.rich_text)}</li>`;

    case "numbered_list_item":
      return `<li data-numbered>${richTextToHtml(data.rich_text)}</li>`;

    case "quote":
      return `<blockquote>${richTextToHtml(data.rich_text)}</blockquote>`;

    case "divider":
      return `<hr />`;

    case "image": {
      const src = data.type === "external" ? data.external.url : data.file?.url;
      if (!src) return "";
      const cached = await cacheImage(src, "block-image");
      if (!cached) return "";
      const caption = richTextToHtml(data.caption) || "";
      return `<figure><img src="${escapeAttr(cached)}" alt="${escapeAttr(stripTags(caption))}" />${caption ? `<figcaption>${caption}</figcaption>` : ""}</figure>`;
    }

    default:
      // 지원 안 하는 타입: 평문으로라도 보여줄 rich_text가 있으면 paragraph로
      if (data?.rich_text?.length) {
        return `<p>${richTextToHtml(data.rich_text)}</p>`;
      }
      return "";
  }
}

function stripTags(html) {
  return (html || "").replace(/<[^>]+>/g, "");
}

// 연속된 list item들을 ul/ol로 묶기
function wrapLists(htmlBlocks) {
  const out = [];
  let listBuf = null; // { type: 'ul' | 'ol', items: [] }
  const flush = () => {
    if (!listBuf) return;
    const items = listBuf.items.join("");
    out.push(`<${listBuf.type}>${items}</${listBuf.type}>`);
    listBuf = null;
  };
  for (const h of htmlBlocks) {
    const isBulleted = h.startsWith("<li>");
    const isNumbered = h.startsWith("<li data-numbered>");
    if (isBulleted || isNumbered) {
      const type = isNumbered ? "ol" : "ul";
      if (!listBuf || listBuf.type !== type) {
        flush();
        listBuf = { type, items: [] };
      }
      listBuf.items.push(h.replace(" data-numbered", ""));
    } else {
      flush();
      out.push(h);
    }
  }
  flush();
  return out.join("\n");
}

// --------- Public API ---------

// 모든 published 글 목록 (목록 페이지용 — 썸네일 포함)
export async function getAllPublishedPosts() {
  const res = await notion.databases.query({
    database_id: DB_ID,
    filter: { property: PROP.status, select: { equals: "Published" } },
    sorts: [{ property: PROP.date, direction: "descending" }],
    page_size: 100,
  });

  const posts = [];
  for (const page of res.results) {
    const thumbnailUrl = getThumbnailUrl(page);
    const cachedThumbnail = thumbnailUrl ? await cacheImage(thumbnailUrl, "thumbnail") : null;
    posts.push({
      id: page.id,
      slug: slugify(page),
      title: getTitle(page) || "(제목 없음)",
      date: getDate(page),
      status: getStatus(page),
      thumbnail: cachedThumbnail,
    });
  }
  return posts;
}

// 단일 글 상세 — blocks 포함 (HTML 변환됨)
export async function getPostBySlug(slug) {
  // slug로 바로 못 찾으니 전체 조회 후 매칭
  const res = await notion.databases.query({
    database_id: DB_ID,
    filter: { property: PROP.status, select: { equals: "Published" } },
  });
  const page = res.results.find((p) => slugify(p) === slug);
  if (!page) return null;

  const thumbnailUrl = getThumbnailUrl(page);
  const cachedThumbnail = thumbnailUrl ? await cacheImage(thumbnailUrl, "thumbnail") : null;

  // Blocks fetch (페이지네이션 처리)
  const blocks = [];
  let cursor = undefined;
  do {
    const r = await notion.blocks.children.list({
      block_id: page.id,
      start_cursor: cursor,
      page_size: 100,
    });
    blocks.push(...r.results);
    cursor = r.has_more ? r.next_cursor : undefined;
  } while (cursor);

  const htmlBlocks = [];
  for (const b of blocks) {
    htmlBlocks.push(await blockToHtml(b));
  }
  const bodyHtml = wrapLists(htmlBlocks.filter(Boolean));

  return {
    id: page.id,
    slug: slugify(page),
    title: getTitle(page) || "(제목 없음)",
    date: getDate(page),
    status: getStatus(page),
    thumbnail: cachedThumbnail,
    bodyHtml,
  };
}

// 모든 slug 목록 (getStaticPaths 용)
export async function getAllSlugs() {
  const posts = await getAllPublishedPosts();
  return posts.map((p) => p.slug);
}
