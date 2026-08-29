@echo off
title Sonar AI - Desktop Super-Agent Launcher
echo ===================================================
echo     Launching Sonar AI Ambient Voice Super-Agent
echo ===================================================
echo.
echo Opening Sonar AI in Standalone Desktop PWA Mode...
start msedge --app="https://sonar-ai.vercel.app" 2>nul || start chrome --app="https://sonar-ai.vercel.app" 2>nul || start "" "https://sonar-ai.vercel.app"
echo.
echo Sonar AI is now running in standalone desktop window!
pause
