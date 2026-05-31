# POLY AI Agent — 프로젝트 가이드

POLY/CANB 학원의 **AI 경영 분석 플랫폼** UI 프로토타입. Vanilla HTML/CSS/JS 정적 멀티 페이지.

## 배포 / URL
- **GitHub Pages (라이브):** https://jinilee-hue.github.io/poly-ai-agent/
  - 진입(`index.html`)은 `login.html`로 리다이렉트
  - 홈 직접 접속: https://jinilee-hue.github.io/poly-ai-agent/home.html
- **원격 저장소:** https://github.com/jinilee-hue/poly-ai-agent (`origin/main`)

## 파일 구조
```
index.html              진입 → login.html 리다이렉트
login.html / signup.html  로그인 / 회원가입 (좌측 영상 풀블리드 배경 + 폼)
home.html               메인 — AI 질문 입력, 예시, 데이터소스 피커
chat.html / chat-list.html   채팅 / 채팅 목록(검색·기간·열기/삭제 버튼)
projects.html / project-detail.html  프로젝트 목록(검색·상태 필터) / 상세
reports.html / report-view.html      리포트 목록(6열 그리드) / 뷰어(차트)
styles/tokens.css       디자인 토큰 (색상·타이포·간격) + 다크모드
styles/common.css       공통 컴포넌트 (라이브러리 CSS 뒤에 로드)
styles/pages.css        페이지별 스타일 (단일 파일)
js/layout.js            커스텀 셀렉트·Flatpickr 드롭다운·테마 토글 유틸
js/utils.js             공통 유틸
images/                 리포트 썸네일(1~5.png), 로그인 그래픽/영상
```

## 디자인 시스템 — 핵심 규칙
> 상세·완전판은 `/poly-dashboard` 스킬(전역)을 따른다. 코드 작성 전 해당 스킬을 우선 참조.

- **Poly Blue `#0066FF` 단일 색상 + 투명도** 톤앤톤. CANB는 마젠타 `#BC216D` (LNB 브랜드 스위처로 런타임 토큰 교체).
- **모든 색은 `tokens.css`의 CSS 변수만 사용** — 인라인 hex·`rgba(...)` 하드코딩 금지. (예: `var(--color-primary)`, `var(--color-primary-a30)`)
- 차트에 빨강·주황·회색·녹색 및 시맨틱 색(success/warning/danger) 금지 — 차트는 Poly Blue 투명도(`--chart-1`~`--chart-6`)만.
- **삭제/액션 버튼에 빨강 사용 금지** — 중립 톤(`--color-border-strong` + `--color-bg-muted` + `--color-text-primary`)으로. (사용자 지시)
- `badge-info` 금지 → `badge-success`/`badge-primary`/`badge-neutral`로 대체.
- `.flatpickr-calendar`에 `position: relative !important` 금지.

## CDN 로드 순서 (Flatpickr 사용 페이지)
`tokens.css` → flatpickr CSS → `common.css` → `pages.css`,
JS는 flatpickr.min.js → l10n/ko.js 순. (페이지에 따라 utils.js → layout.js)

## 작업 컨벤션
- 사이드바(LNB)는 각 HTML에 인라인 마크업으로 중복 존재 — 한 페이지 변경 시 동일 변경을 다른 페이지에도 반영해야 할 수 있음.
- 열기/삭제 등 목록 액션 버튼은 `.cl-item-action`(36×36 아이콘 버튼, 열기=Poly Blue / 삭제=중립 hover)로 통일.
- 테마/브랜드 상태는 `localStorage`의 `epTheme`, `polyBrand` 키 사용.

## Git
- 이 PC는 Git이 PATH에 없을 수 있음 → 새 터미널/VS Code 재시작 후 `git` 사용. (설치 경로: `C:\Program Files\Git\cmd`)
- 커밋 작성자: 이 저장소 local 설정 `이진희 <jini.lee@edu-poly.com>`.
