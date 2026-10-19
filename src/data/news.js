// 뉴스 게시글을 추가/수정/삭제하려면 이 파일만 편집하세요.
// slug: URL에 쓰이는 영문/숫자 식별자 (중복 불가). 예: /news/launch
// body: HTML을 그대로 사용. 이미지는 <img src="/images/파일명" alt="..." />

// ============================================
// ⚠️ 아래는 Masonry 레이아웃 테스트용 임시 데이터입니다.
// 실제 데이터는 noteon 연동 시 교체되며,
// 테스트 끝나면 이 섹션 삭제하고 원본 2건 복원하세요.
// 원본 2건은 하단에 주석으로 보관.
// 썸네일: picsum.photos (Lorem Picsum) 랜덤 이미지, 비율 다양.
// ============================================

export const news = [
  {
    slug: 'test-01',
    title: '피부 생태계 저널 — 겨울의 밸런스',
    date: '2026-10-14',
    thumbnail: 'https://picsum.photos/id/1015/640/960', // 2:3 세로
    excerpt: '건조한 계절에 피부가 보내는 신호와 비피블랑쉬의 처방 노트.',
    body: `<p>테스트 본문입니다.</p>`
  },
  {
    slug: 'test-02',
    title: '마이크로바이옴 리서치 노트',
    date: '2026-10-12',
    thumbnail: 'https://picsum.photos/id/1025/640/640', // 1:1 정사각
    excerpt: '프로/프리바이오틱스의 시너지, 그 과학적 근거.',
    body: `<p>테스트 본문입니다.</p>`
  },
  {
    slug: 'test-03',
    title: '브랜드 필름: 순수한 밸런스',
    date: '2026-10-10',
    thumbnail: 'https://picsum.photos/id/1033/640/480', // 4:3 가로
    excerpt: '비피블랑쉬가 바라보는 피부와 자연의 관계.',
    body: `<p>테스트 본문입니다.</p>`
  },
  {
    slug: 'test-04',
    title: '신비 콤플렉스™의 네 가지 축',
    date: '2026-10-08',
    thumbnail: 'https://picsum.photos/id/1040/640/800', // 4:5 세로
    excerpt: 'Longevity, Skin Barrier, Microbiome Balance, Anti-wrinkle.',
    body: `<p>테스트 본문입니다.</p>`
  },
  {
    slug: 'test-05',
    title: '유리병 패키징, 왜 선택했을까',
    date: '2026-10-05',
    thumbnail: 'https://picsum.photos/id/1050/640/427', // 3:2 가로
    excerpt: '지속가능성과 품질 보존 사이에서의 선택.',
    body: `<p>테스트 본문입니다.</p>`
  },
  {
    slug: 'test-06',
    title: '피부 자극 지수 0.00 원칙',
    date: '2026-10-03',
    thumbnail: 'https://picsum.photos/id/1060/640/720', // 8:9 세로
    excerpt: '성분 선별 기준과 테스트 프로토콜 공개.',
    body: `<p>테스트 본문입니다.</p>`
  },
  {
    slug: 'test-07',
    title: '시즌 레시피: 겨울 저녁 루틴',
    date: '2026-10-01',
    thumbnail: 'https://picsum.photos/id/1074/640/900', // ~16:22 세로
    excerpt: '한 겹씩 쌓는 레이어링 가이드.',
    body: `<p>테스트 본문입니다.</p>`
  },
  {
    slug: 'test-08',
    title: '팀 인터뷰 — 제품개발 라운드테이블',
    date: '2026-09-28',
    thumbnail: 'https://picsum.photos/id/1084/640/400', // 8:5 가로
    excerpt: '처방 설계자가 들려주는 비하인드.',
    body: `<p>테스트 본문입니다.</p>`
  },
  {
    slug: 'test-09',
    title: '스쿠알란 페이스 오일, 사용 노트',
    date: '2026-09-25',
    thumbnail: 'https://picsum.photos/id/110/640/640', // 1:1
    excerpt: '아침과 저녁, 두 가지 사용법.',
    body: `<p>테스트 본문입니다.</p>`
  },
  {
    slug: 'test-10',
    title: '리뷰 큐레이션 — 가을의 피드백',
    date: '2026-09-20',
    thumbnail: 'https://picsum.photos/id/129/640/855', // ~3:4 세로
    excerpt: '소비자 피드백에서 발견한 세 가지 포인트.',
    body: `<p>테스트 본문입니다.</p>`
  },
  {
    slug: 'test-11',
    title: '팝업 노트: 서울 성수',
    date: '2026-09-15',
    thumbnail: 'https://picsum.photos/id/139/640/360', // 16:9 가로
    excerpt: '오프라인 공간에서의 브랜드 경험.',
    body: `<p>테스트 본문입니다.</p>`
  },
  {
    slug: 'test-12',
    title: '아카이브 — 로고 스케치북',
    date: '2026-09-10',
    thumbnail: 'https://picsum.photos/id/145/640/780', // ~16:19 세로
    excerpt: '손으로 그린 BIFI BLANCHE 로고의 변천사.',
    body: `<p>테스트 본문입니다.</p>`
  }
];

/* ============================================
// 원본 2건 보관 (Masonry 테스트 후 복원용)

{
  slug: 'launch',
  title: '비피블랑쉬 브랜드 런칭 안내',
  date: '2026-09-01',
  thumbnail: '/images/main_img.jpg',
  excerpt: '피부의 균형을 지키는 브랜드, 비피블랑쉬가 정식으로 런칭되었습니다.',
  body: `
    <p>안녕하세요, 비피블랑쉬입니다.</p>
    <p>피부를 하나의 생태계로 바라보는 스킨케어 브랜드 <strong>비피블랑쉬</strong>가 정식으로 런칭되었습니다. 순수한 균형, 자극지수 0.00의 원칙으로 당신의 피부 생태계를 지킵니다.</p>
    <p>런칭 기념 첫 제품 <strong>마이크로바이옴 스쿠알란 페이스 오일</strong>이 네이버 스마트스토어에서 만나보실 수 있습니다.</p>
  `
},
{
  slug: 'face-oil-launch',
  title: '마이크로바이옴 스쿠알란 페이스 오일 출시',
  date: '2026-09-05',
  thumbnail: '/images/thumb_faceoil.jpg',
  excerpt: '신비 콤플렉스™를 담은 첫 번째 페이스 오일이 정식 출시되었습니다.',
  body: `
    <p>비피블랑쉬의 첫 번째 제품, <strong>마이크로바이옴 스쿠알란 페이스 오일</strong>이 출시되었습니다.</p>
    <p>Probiotics와 Prebiotics의 시너지, SynBiotics를 기반으로 설계된 성분 복합체 <strong>신비 콤플렉스™</strong>를 담았습니다. 피부 장벽 개선, 피부 생태계 균형, 주름 개선, 트러블 개선에 효과를 발휘합니다.</p>
  `
}
============================================ */
