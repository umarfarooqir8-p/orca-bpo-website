@echo off
title ORCA Notepad Receiver
cd /d "%~dp0"
echo Notepad only — Google Sheets is off.
echo Keep this window open.
echo.
node start-notepad-receiver.mjs
pause
