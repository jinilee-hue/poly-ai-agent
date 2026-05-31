---
name: poly-ai-agent
description: 'Use this skill whenever the user is working on the POLY AI Agent project (d:\이진희\#2026\poly-ai-agent) — the POLY/CANB AI 경영 분석 플랫폼 UI 프로토타입. Trigger aggressively: not only on "poly-ai-agent" or "AI 경영 분석/AI 에이전트", but also when this project''s domain words appear alongside requests to create, modify, or review pages — AI 질문 입력/홈(home.html), 채팅/채팅 목록(chat·chat-list), 프로젝트 목록/상세(projects·project-detail), 리포트 목록/뷰어(reports·report-view), 로그인/회원가입(login·signup), 데이터소스 피커, 예시 카드, 검색·기간·상태 필터, 열기/삭제 액션 버튼. Provides project-specific context (file structure, page roles, conventions). For all design-system rules (Poly Blue tone-on-tone color rules, forbidden colors, CDN load order, .flatpickr-calendar overflow rule, dark mode, Chart.js themechange), this skill DEFERS to and you MUST also consult the global /poly-dashboard skill (or /canb-dashboard for CANB-brand work). Consult before writing code for this project, even if the request seems straightforward.'
---

# POLY AI Agent

POLY/CANB 학원의 **AI 경영 분석 플랫폼** UI 프로토타입. Vanilla HTML/CSS/JS 정적 멀티 페이지.
이 스킬은 **이 프로젝트 고유 컨텍스트**만 담습니다. **디자인 시스템 규칙(색·토큰·차트·flatpickr·다크모드·CDN 순서)은 전역 `/poly-dashboard` 스킬이 단일 출처(SSOT)** 이며, 코드 작성 전 반드시 함께 참조합니다. (CANB 브랜드 작업은 `/canb-dashboard`.)

---

## §1. 작업 전 필수 절차

1. **디자인 규칙은 `/poly-dashboard`를 먼저 호출/참조** — 색상(Poly Blue `#0066FF` 톤온톤), 금지색·금지 패턴, CDN 로드 순서, `.flatpickr-calendar` 오버플로 규칙, 다크모드, 차트 `themechange` 재빌드 규칙은 모두 그쪽이 정본입니다. 여기서 중복 서술하지 않습니다.
2. **모든 색은 `styles/tokens.css`의 CSS 변수만 사용** — 인라인 hex·`rgba(...)` 금지. PostToolUse 훅(`poly-validate.ps1`)이 위반을 `exit 2`로 되돌려줍니다.
3. **삭제/액션 버튼에 빨강 금지** — 중립 톤(`--color-border-strong` + `--color-bg-muted` + `--color-text-primary`). (사용자 지시)

---

## §2. 파일 구조 / 페이지 역할

```
index.html                  진입 → login.html 리다이렉트
login.html / signup.html    로그인 / 회원가입 (좌측 영상 풀블리드 배경 + 폼)
home.html                   메인 — AI 질문 입력, 예시 카드, 데이터소스 피커
chat.html / chat-list.html  채팅 / 채팅 목록(검색·기간·열기/삭제 버튼)
projects.html / project-detail.html  프로젝트 목록(검색·상태 필터) / 상세
reports.html / report-view.html      리포트 목록(6열 그리드) / 뷰어(차트)
styles/tokens.css   디자인 토큰 (색·타이포·간격) + 다크모드  ← 색의 정본
styles/common.css   공통 컴포넌트 (라이브러리 CSS 뒤에 로드)
styles/pages.css    페이지별 스타일 (단일 파일)
js/layout.js        커스텀 셀렉트·Flatpickr 드롭다운·테마 토글 유틸
js/utils.js         공통 유틸
images/             리포트 썸네일(1~5.png), 로그인 그래픽/영상
```

---

## §3. 프로젝트 컨벤션 (이 레포 고유)

- **LNB(사이드바)는 각 HTML에 인라인 마크업으로 중복 존재** — 한 페이지를 바꾸면 동일 변경을 다른 페이지에도 반영해야 할 수 있음. 변경 시 영향 페이지를 먼저 확인.
- **목록 액션 버튼은 `.cl-item-action`으로 통일** — 36×36 아이콘 버튼, 열기 = Poly Blue / 삭제 = 중립 hover. 새 목록을 만들 때 이 클래스를 재사용.
- **배지는 `badge-success` / `badge-primary` / `badge-neutral`** — `badge-info` 금지(훅이 차단).
- **테마/브랜드 상태는 `localStorage`** — 키 `epTheme`(다크모드), `polyBrand`(POLY↔CANB 브랜드 스위처, 런타임 토큰 교체).
- **CANB 브랜드** — LNB 브랜드 스위처로 마젠타 `#BC216D` 토큰으로 런타임 교체. CANB 화면 작업 시 `/canb-dashboard` 병행 참조.

---

## §4. CDN 로드 순서 (Flatpickr 사용 페이지)

CSS: `tokens.css` → flatpickr CSS → `common.css` → `pages.css`
JS: `flatpickr.min.js` → `l10n/ko.js` (페이지에 따라 `utils.js` → `layout.js`)
> 상세·근거는 `/poly-dashboard` 참조.

---

## §5. 배포

- 라이브: https://jinilee-hue.github.io/poly-ai-agent/ (진입은 `login.html` 리다이렉트, 홈 직접: `/home.html`)
- 원격: https://github.com/jinilee-hue/poly-ai-agent (`origin/main`)
- 커밋 작성자: `이진희 <jini.lee@edu-poly.com>`. Git이 PATH에 없으면 `C:\Program Files\Git\cmd`.
