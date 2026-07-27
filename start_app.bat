@echo off
title Aditya Chatbot & Student Support System Server
color 0A
echo =======================================================
echo   Launching Aditya University AI Chatbot Server...
echo =======================================================
echo.

cd /d "%~dp0"

:: Start Node.js Server in background
echo Starting server on http://localhost:3000 ...
start /b node server.js

:: Wait 2 seconds for server startup
timeout /t 2 /nobreak >nul

:: Automatically open Student Chatbot in default Web Browser
echo Opening Chatbot in Web Browser...
start http://localhost:3000

echo.
echo =======================================================
echo  Server is running smoothly on http://localhost:3000
echo  Press Ctrl+C or close this window to stop the server.
echo =======================================================
echo.
pause
