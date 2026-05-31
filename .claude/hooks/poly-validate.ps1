# poly-validate.ps1 — PostToolUse 정적 분석 훅
# Edit/Write로 저장된 .html/.css에서 POLY 디자인 시스템 규칙 위반 5개 항목을 감지한다.
#   1) 브랜드 컬러 rgba 하드코딩
#   2) 브랜드 hex 하드코딩
#   3) 금지 배지 클래스 (badge-info)
#   4) 차트 이벤트 리스너(themechange) 누락
#   5) flatpickr 금지 패턴 (.flatpickr-calendar position:relative !important)
# 위반 시 stderr 경고 + exit 2 (Claude에 피드백). 위반 없으면 조용히 exit 0.
# CSS 변수 정의/토큰 맵 라인('--' 포함)·tokens.css는 예외 → 정식 토큰 정의는 통과.
# stdin/stderr는 UTF-8로 강제 (한글 사용자명 경로 mojibake·출력 깨짐 방지).
$ErrorActionPreference = 'SilentlyContinue'
[Console]::OutputEncoding = New-Object Text.UTF8Encoding $false

$raw = (New-Object IO.StreamReader([Console]::OpenStandardInput(), (New-Object Text.UTF8Encoding $false))).ReadToEnd()
if (-not $raw) { exit 0 }
try { $data = $raw | ConvertFrom-Json } catch { exit 0 }

$fp = $data.tool_input.file_path
if (-not $fp) { exit 0 }
if ($fp -notmatch '\.(html|css)$') { exit 0 }
if ($fp -match 'tokens\.css$') { exit 0 }      # 토큰 정의 파일은 통째로 예외
if (-not (Test-Path -LiteralPath $fp)) { exit 0 }

$lines = @(Get-Content -LiteralPath $fp)
$content = ($lines -join "`n")
$violations = @()

# [1] 브랜드 컬러 rgba 하드코딩 / [2] 브랜드 hex 하드코딩  (라인 단위, '--' 정의 라인 예외)
for ($i = 0; $i -lt $lines.Count; $i++) {
  $line = $lines[$i]
  if ($line -match '--') { continue }
  $ln = $i + 1
  if     ($line -match 'rgba\(\s*0\s*,\s*102\s*,\s*255')  { $violations += "[1] L${ln}: 브랜드 컬러 rgba(0,102,255) 하드코딩 -> var(--color-primary-aXX)/--chart-N" }
  elseif ($line -match 'rgba\(\s*188\s*,\s*33\s*,\s*109') { $violations += "[1] L${ln}: 브랜드 컬러 rgba(188,33,109) 하드코딩 -> CSS 변수 (CANB)" }
  if     ($line -match '#0066[fF][fF]')                   { $violations += "[2] L${ln}: 브랜드 hex #0066FF 하드코딩 -> var(--color-primary)" }
  elseif ($line -match '#[bB][cC]216[dD]')                { $violations += "[2] L${ln}: 브랜드 hex #BC216D 하드코딩 -> var(--color-primary)" }
}

# [3] 금지 배지 클래스
if ($content -match 'badge-info') { $violations += "[3] 금지 배지 클래스 badge-info -> badge-success / badge-primary / badge-neutral" }

# [4] 차트 이벤트 리스너(themechange) 누락 — Chart.js 사용 페이지인데 테마 재빌드 리스너 없음
if (($content -match 'new\s+Chart\s*\(') -and ($content -notmatch 'themechange')) {
  $violations += "[4] 차트 이벤트 리스너 누락 -> window.addEventListener('themechange', buildCharts) 필요 (다크모드 차트 재빌드)"
}

# [5] flatpickr 금지 패턴
if ($content -match '\.flatpickr-calendar[^}]*position:\s*relative\s*!important') {
  $violations += "[5] .flatpickr-calendar position:relative !important 금지 (팝업 위치 깨짐)"
}

if ($violations.Count -gt 0) {
  $fileName = Split-Path $fp -Leaf
  [Console]::Error.WriteLine("[poly-validate] $fileName - POLY 디자인 시스템 규칙 위반 $($violations.Count)건:")
  foreach ($v in ($violations | Select-Object -First 10)) { [Console]::Error.WriteLine("  - $v") }
  [Console]::Error.WriteLine("규칙 상세: /poly-dashboard 스킬 / 모든 색상은 tokens.css 변수 사용")
  exit 2
}
exit 0
