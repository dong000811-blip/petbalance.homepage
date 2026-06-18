# PETBALANCE 홈페이지 개발 가이드

## 디렉토리 구조

```
petbalance/
├── index.html                  # 메인 홈페이지 (4섹션)
├── css/
│   ├── variables.css           # ★ 디자인 수정은 여기만 (색상/폰트/간격)
│   ├── base.css                # 리셋, 공통 컴포넌트, 애니메이션
│   ├── nav.css                 # 네비게이션 전용
│   └── sections.css            # 메인 섹션 레이아웃
├── js/
│   ├── nav.js                  # 네비게이션 동작
│   └── animations.js           # 스크롤 애니메이션 (Intersection Observer)
├── assets/
│   └── images/                 # 이미지 파일
└── pages/
    ├── _template.html          # 서브페이지 복사 템플릿
    ├── petbalance/             # 회사소개
    ├── pet-product/            # 제품
    ├── pet-service/            # 서비스
    ├── pet-advisor/            # 어드바이저
    ├── community/              # 커뮤니티
    └── ethics/                 # 윤리
```

## 메인 섹션 구성

| 섹션 | ID | 설명 |
|------|----|------|
| 1 | `#hero` | 풀스크린 히어로 (배경 이미지 교체 가능) |
| 2 | `#business` | 사업영역 3카드 (Pet Product / Factory / E-Commerce) |
| 3 | `#brand` | 브랜드/제품 하이라이트 |
| 4 | `#contact` | CTA + 연락처 |

## Claude Code 작업 패턴

### 디자인 색상 변경
```
css/variables.css 의 --color-primary 값만 수정
```

### 새 서브페이지 추가
```
pages/_template.html 복사 → pages/[카테고리]/index.html
제목/내용만 교체
```

### 히어로 배경 이미지 적용
```html
<!-- index.html 의 section-hero에 추가 -->
<section class="section section-hero has-bg"
  style="background-image: url('assets/images/hero-bg.jpg')">
```

### 비즈니스 카드 이미지 교체
```html
<img src="assets/images/business-product.jpg" alt="펫 제품" />
```

## 배포 (Cloudflare Pages)

1. GitHub 저장소 생성 후 push
2. Cloudflare Pages → "Connect to Git" → 저장소 선택
3. Build command: 없음 (Static)
4. Output directory: `/` (루트)
5. 도메인 연결 → petbalance.co.kr

## 폰트
- 영문: Montserrat (Google Fonts, variables.css에서 import)
- 한글: Noto Sans KR (Google Fonts)
- 교체 원할 시 css/base.css 상단 @import URL 수정

## 로고 교체
- 현재: CSS 텍스트 로고 (`PetBalance`)
- 이미지 로고 사용 시: nav__logo-en/ko span 제거 후 `<img src="assets/images/logo.svg">` 삽입
