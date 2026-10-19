// Notion 연결 테스트 — 토큰/DB ID 유효성 + 샘플 글 확인
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const dbId = process.env.NOTION_DATABASE_ID;

console.log("Database ID:", dbId);
console.log("Token prefix:", process.env.NOTION_TOKEN?.slice(0, 10) + "...");

try {
  const db = await notion.databases.retrieve({ database_id: dbId });
  const title = db.title?.map(t => t.plain_text).join("") || "(no title)";
  console.log("\n✓ Database connected:", title);
  console.log("Properties available:");
  for (const [name, def] of Object.entries(db.properties || {})) {
    console.log(`  - ${name} (${def.type})`);
  }

  const query = await notion.databases.query({
    database_id: dbId,
    page_size: 10,
  });
  console.log(`\n✓ Found ${query.results.length} page(s)`);
  for (const page of query.results) {
    console.log("  ID:", page.id);
    for (const [name, val] of Object.entries(page.properties || {})) {
      let v = "";
      switch (val.type) {
        case "title": v = val.title?.map(t => t.plain_text).join(""); break;
        case "rich_text": v = val.rich_text?.map(t => t.plain_text).join(""); break;
        case "date": v = val.date?.start; break;
        case "select": v = val.select?.name; break;
        case "files": v = (val.files || []).map(f => f.type === "external" ? f.external.url : f.file?.url).join(", "); break;
        default: v = JSON.stringify(val[val.type]);
      }
      console.log(`    ${name}: ${v}`);
    }
    console.log("");
  }
} catch (e) {
  console.error("\n✗ Error:", e.message);
  console.error(e);
}
