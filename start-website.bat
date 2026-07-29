@echo off
title ORCA BPO Website
cd /d "%~dp0"

echo Starting ORCA BPO website for you + friends on your Wi-Fi...
echo Keep this window open while anyone is viewing the site.
echo.

REM Show your Network link (friends use this, not localhost)
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4 Address"') do (
  set IP=%%a
  goto :gotip
)
:gotip
set IP=%IP: =%
echo ========================================
echo  YOU open:      http://localhost:8080/
echo  FRIENDS open:  http://%IP%:8080/
echo ========================================
echo.
echo Friends must be on the SAME Wi-Fi as you.
echo.

start "" "http://localhost:8080/"
call npm run dev
pause
