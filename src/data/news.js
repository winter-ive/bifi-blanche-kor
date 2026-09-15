// 뉴스 게시글을 추가/수정/삭제하려면 이 파일만 편집하세요.
// slug: URL에 쓰이는 영문/숫자 식별자 (중복 불가). 예: /news/launch
// body: HTML을 그대로 사용. 이미지는 <img src="/images/파일명" alt="..." />

export const news = [
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
];
