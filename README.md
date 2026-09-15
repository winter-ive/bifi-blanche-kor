# Bifi Blanche

Astro 기반 정적 웹사이트. Vercel/Netlify에 그대로 배포 가능.

## 실행

```bash
cd bifi-blanche/site
npm install       # 최초 1회만
npm run dev       # 개발 서버: http://localhost:4321
npm run build     # 정적 파일 빌드 → dist/
npm run preview   # 빌드 결과 미리보기
```

## 폴더 구조

```
site/
├── public/
│   └── images/           # 사이트 이미지 (경로: /images/파일명)
└── src/
    ├── components/       # 재사용 컴포넌트
    │   ├── Header.astro          # 상단 네비게이션
    │   ├── Footer.astro          # 하단 정보
    │   ├── Ticker.astro          # 최상단 흐르는 문구
    │   ├── FloatingIcons.astro   # 우하단 챗봇/맨위로 버튼
    │   └── ProductSlider.astro   # 메인 페이지 상품 슬라이드
    ├── data/             # 콘텐츠 데이터 (여기만 수정하면 됨)
    │   ├── products.js           # 상품 슬라이드 항목
    │   └── news.js               # NEWS 게시글
    ├── layouts/
    │   └── BaseLayout.astro      # 공통 레이아웃 (헤더/푸터/티커 포함)
    ├── pages/
    │   ├── index.astro           # 메인 (/)
    │   ├── brand.astro           # 브랜드 (/brand)
    │   └── news/
    │       ├── index.astro       # 뉴스 목록 (/news)
    │       └── [slug].astro      # 뉴스 상세 (/news/글slug)
    └── styles/
        └── global.css            # 전역 스타일 & 색상 변수
```

## 콘텐츠 편집

### 상품 추가/수정/삭제

`src/data/products.js` 파일만 수정.

```js
{
  id: 'face-oil',
  badge: 'BEST PRODUCT',
  nameEn: 'BIFI BLANCHE\nMICROBIOME SQUALANE FACE OIL',
  nameKr: '비피블랑쉬 마이크로바이옴 스쿠알란 페이스 오일',
  originalPrice: 39000,
  price: 31200,
  discountRate: 20,
  image: '/images/thumb_faceoil.jpg',        // public/images/ 에 파일 넣고 경로 지정
  shopUrl: 'https://smartstore.naver.com/'   // 스마트스토어 상세 URL
}
```

배열 순서대로 슬라이드에 표시됩니다. 5초 간격 디졸브 자동 전환.

### 뉴스 추가/수정/삭제

`src/data/news.js` 파일만 수정.

```js
{
  slug: 'launch',                            // URL: /news/launch
  title: '비피블랑쉬 브랜드 런칭 안내',
  date: '2026-09-01',
  thumbnail: '/images/main_img.jpg',
  excerpt: '...',                            // 목록 카드에 표시할 요약
  body: `<p>본문...</p><img src="/images/xxx.jpg" />`
}
```

## 링크 설정

- **NAVER STORE 링크**: `src/components/Header.astro`, `src/components/Footer.astro`, `src/data/products.js`의 `shopUrl`
- **주소/전화/영업시간**: `src/components/Footer.astro`

## 챗봇 연동 (추후)

`src/components/FloatingIcons.astro` 의 `chatbot-btn` 클릭 이벤트 부분에 채널톡/카카오채널/Tidio 등 스크립트 연동.

## 배포

Netlify/Vercel에 프로젝트 폴더(`bifi-blanche/site`)를 연결. 빌드 명령 `npm run build`, 배포 디렉토리 `dist`.
