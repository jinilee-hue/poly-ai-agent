# open-browser.ps1 — PostToolUse 훅
# HTML 파일이 수정되면 기본 브라우저로 자동 오픈한다. (시각 검증 루프 단축)
$ErrorActionPreference = 'SilentlyContinue'

$raw = (New-Object IO.StreamReader([Console]::OpenStandardInput(), (New-Object Text.UTF8Encoding $false))).ReadToEnd()
if (-not $raw) { exit 0 }
try { $data = $raw | ConvertFrom-Json } catch { exit 0 }

$fp = $data.tool_input.file_path
if (-not $fp) { exit 0 }
if ($fp -notmatch '\.html$') { exit 0 }
if (-not (Test-Path -LiteralPath $fp)) { exit 0 }

Start-Process $fp | Out-Null
exit 0
