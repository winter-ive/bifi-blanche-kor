// 상품을 추가/수정/삭제하려면 이 파일만 편집하세요.
// image는 /public/images/ 안에 파일을 넣고 경로를 /images/파일명 형식으로 지정합니다.
// shopUrl에는 네이버 스마트스토어 상세페이지 URL을 넣으세요.

export const products = [
  {
    id: 'face-oil',
    badge: 'BEST PRODUCT',
    nameEn: 'BIFI BLANCHE\nMICROBIOME SQUALANE FACE OIL',
    nameKr: '비피블랑쉬 마이크로바이옴 스쿠알란 페이스 오일',
    originalPrice: 39000,
    price: 31200,
    discountRate: 20,
    image: '/images/thumb_faceoil.jpg',
    shopUrl: 'https://smartstore.naver.com/'
  },
  {
    id: 'sun-cream',
    badge: 'BEST PRODUCT',
    nameEn: 'BIFI BLANCHE\nMICROBIOME SUNSCREEN',
    nameKr: '비피블랑쉬 마이크로바이옴 선크림',
    originalPrice: 42000,
    price: 33600,
    discountRate: 20,
    image: '/images/bifi_suncream.jpg',
    shopUrl: 'https://smartstore.naver.com/'
  }
];
