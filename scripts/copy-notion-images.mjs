// Post-build 스크립트
// Astro는 public/ 폴더를 빌드 초반에 복사하는데,
// notion.js가 getStaticPaths 단계에서 public/notion-images/ 에 이미지를 다운로드하므로
// 그 이미지들은 dist/ 복사 이후에 생성되어 산출물에 포함되지 않음.
// 따라서 Astro 빌드 종료 후 public/notion-images/ → dist/notion-images/ 로 수동 복사.

import { cp, access, mkdir } from "node:fs/promises";
import { join } from "node:path";

const SRC = join(process.cwd(), "public", "notion-images");
const DEST = join(process.cwd(), "dist", "notion-images");

try {
  await access(SRC);
} catch {
  console.log("[copy-notion-images] public/notion-images/ 가 없어 복사 생략");
  process.exit(0);
}

await mkdir(DEST, { recursive: true });
await cp(SRC, DEST, { recursive: true, force: true });
console.log(`[copy-notion-images] 복사 완료: ${SRC} → ${DEST}`);
