@echo off
title Aegis Intelligence - Platform Launcher
echo ==============================================================================
echo AEGIS INTELLIGENCE - TECHNICAL DOCUMENT PLATFORM
echo Aegis Series-7 Hydraulic Control System Knowledge Engine
echo ==============================================================================
echo.

echo [1/2] Starting Aegis FastAPI Backend on http://localhost:8000 ...
start "Aegis Backend (FastAPI)" cmd /k "python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload"

timeout /t 3 /nobreak >nul

echo [2/2] Starting Aegis React/Vite Frontend on http://localhost:5173 ...
start "Aegis Frontend (Vite)" cmd /k "cd frontend && npm run dev"

echo.
echo ==============================================================================
echo System active!
echo Web UI: http://localhost:5173
echo API Docs: http://localhost:8000/docs
echo ==============================================================================
pause
