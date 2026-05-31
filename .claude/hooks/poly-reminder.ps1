# poly-reminder.ps1 — Stop 훅
# 세션 종료(응답 완료) 시 컨텍스트 희석 방지를 위해 /clear 및 스킬 재호출을 안내한다. (비차단)
[Console]::Error.WriteLine("[세션 마무리 안내] 대화가 길어졌다면 컨텍스트 희석 방지를 위해 -> /clear 후 /poly-dashboard (CANB 작업은 /canb-dashboard) 재호출을 권장합니다. 핵심 규칙은 스킬 파일 / CLAUDE.md / MEMORY.md 에 영속 보존됩니다.")
exit 0
