@echo off
cd /d "%~dp0"
echo Open http://127.0.0.1:4310 in your browser.
echo Keep this window open while editing your portfolio.
call npm run cms
pause
