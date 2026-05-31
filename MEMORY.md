# MEMORY — 프로젝트 결정·버그·작업 기록

> POLY AI Agent 작업 중 내린 **디자인 결정**, 마주친 **버그 패턴**, 환경 설정을 누적하는 문서.
> 새 세션/새 작업자가 같은 맥락을 이어받기 위한 단일 기록. (설계 규칙 자체는 `CLAUDE.md` 참조)

---

## 디자인 결정

### 삭제/액션 버튼에 빨강 금지 (2026-05-30)
- 삭제·위험 액션 버튼이라도 **빨강 사용 금지**. 중립 톤으로 통일.
  - `--color-border-strong` + `--color-bg-muted` + `--color-text-primary`
- **이유:** Poly Blue 단일 톤앤톤 시스템을 깨지 않기 위함(사용자 지시).
- **적용:** 채팅·프로젝트·리포트 목록의 열기/삭제 버튼 → `.cl-item-action`(36×36 아이콘 버튼, 열기=Poly Blue / 삭제=중립 hover)로 통일.

### 색상은 토큰 변수만 사용
- 인라인 hex·`rgba(...)` 하드코딩 금지 → `tokens.css`의 CSS 변수만 사용.
- 차트는 Poly Blue 투명도(`--chart-1`~`--chart-6`)만. 빨강·주황·회색·녹색·시맨틱 색 금지.
- `badge-info` 금지 → `badge-success`/`badge-primary`/`badge-neutral`.

---

## 버그 패턴 / 함정

### PowerShell 훅 — 한글 사용자명 경로 인코딩 (2026-05-31)
- **증상:** PostToolUse 검증 훅(`poly-validate.ps1`)이 위반을 하나도 못 잡고 조용히 통과.
- **원인:** 사용자명이 한글(`이진희`)이라, Claude Code가 보내는 **UTF-8 stdin JSON**을 PS 5.1 `[Console]::In.ReadToEnd()`가 **CP949로 오독** → 경로가 `?댁쭊??`로 깨지고 `\\#`→`\#` 이스케이프 손상 → `ConvertFrom-Json` 실패 → `catch { exit 0 }`로 무사통과. (재시작해도 안 고쳐짐)
- **해결:**
  1. stdin을 raw UTF-8로 직접 디코딩
     `$raw = (New-Object IO.StreamReader([Console]::OpenStandardInput(), (New-Object Text.UTF8Encoding $false))).ReadToEnd()`
  2. 경고 한글 깨짐 방지 — 스크립트 상단에 `[Console]::OutputEncoding = New-Object Text.UTF8Encoding $false`
- 적용: `poly-validate.ps1`, `open-browser.ps1` 둘 다.

### PowerShell 훅 — UTF-8 BOM 필수
- `.claude/hooks/*.ps1`는 **UTF-8 BOM**으로 저장해야 함. BOM 없으면 PS 5.1이 `-File` 실행 시 ANSI로 오독 → 한글 주석이 다음 줄을 삼켜 검사 누락.
- Write 툴은 BOM 없이 저장하므로, 수정 후 반드시 재부여:
  `[IO.File]::WriteAllText($p, $t, (New-Object Text.UTF8Encoding $true))`

---

## 환경 설정

### Claude Code 시연 환경 (2026-05-30~31)
- **스킬:** `/poly-dashboard`, `/canb-dashboard` (전역) — 디자인 규칙 주입.
- **`CLAUDE.md`** — 세션 시작 시 프로젝트 규칙 자동 로드.
- **`.claude/settings.json` 훅:**
  - `PostToolUse(Edit|Write|MultiEdit)` → `poly-validate.ps1`(정적분석 5항목) + `open-browser.ps1`(html 저장 시 브라우저 자동 오픈)
  - `Stop` → `poly-reminder.ps1`(세션 종료 안내)
- **검증 5항목:** ①브랜드 rgba 하드코딩 ②브랜드 hex 하드코딩 ③`badge-info` ④차트 `themechange` 리스너 누락 ⑤flatpickr `position:relative !important`
- 검증 예외: `--` 포함 라인(토큰 정의)·`tokens.css`는 통과.

---

> 메모: Claude Code의 자동 메모리(설정 폴더)와 별개로, 이 문서는 **사람이 읽고 git에 남기는** 결정 기록이다. 새 결정·버그가 생기면 여기 한 줄씩 추가할 것.
