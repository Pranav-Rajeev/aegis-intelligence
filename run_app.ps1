# Aegis Intelligence PowerShell Launcher
Write-Host "==============================================================================" -ForegroundColor Cyan
Write-Host "AEGIS INTELLIGENCE - TECHNICAL DOCUMENT PLATFORM" -ForegroundColor Cyan
Write-Host "Aegis Series-7 Hydraulic Control System Knowledge Engine" -ForegroundColor Cyan
Write-Host "==============================================================================" -ForegroundColor Cyan
Write-Host ""

# Set current directory to the script's root folder
Set-Location $PSScriptRoot

# Resolve Python executable
$pythonExe = "python"
$pyPath = "$env:LOCALAPPDATA\Programs\Python\Python314\python.exe"
if (Test-Path $pyPath) {
    $pythonExe = $pyPath
}

Write-Host "[1/2] Launching FastAPI Backend on http://localhost:8000 ..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "& '$pythonExe' -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload" -WorkingDirectory "$PSScriptRoot"

Start-Sleep -Seconds 3

Write-Host "[2/2] Launching React Vite Frontend on http://localhost:5173 ..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev" -WorkingDirectory "$PSScriptRoot\frontend"

Write-Host ""
Write-Host "==============================================================================" -ForegroundColor Yellow
Write-Host "Platform active!" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Yellow
Write-Host "Backend API: http://localhost:8000/docs" -ForegroundColor Yellow
Write-Host "==============================================================================" -ForegroundColor Yellow
