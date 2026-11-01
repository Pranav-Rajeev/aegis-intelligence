# Aegis Intelligence PowerShell Launcher
Write-Host "==============================================================================" -ForegroundColor Cyan
Write-Host "AEGIS INTELLIGENCE - TECHNICAL DOCUMENT PLATFORM" -ForegroundColor Cyan
Write-Host "Aegis Series-7 Hydraulic Control System Knowledge Engine" -ForegroundColor Cyan
Write-Host "==============================================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/2] Launching FastAPI Backend on http://localhost:8000 ..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload"

Start-Sleep -Seconds 3

Write-Host "[2/2] Launching React Vite Frontend on http://localhost:5173 ..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location frontend; npm run dev"

Write-Host ""
Write-Host "==============================================================================" -ForegroundColor Yellow
Write-Host "Platform active!" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Yellow
Write-Host "Backend API: http://localhost:8000/docs" -ForegroundColor Yellow
Write-Host "==============================================================================" -ForegroundColor Yellow
