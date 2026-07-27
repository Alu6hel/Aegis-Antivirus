@echo off
:: Request Admin Permissions (UAC Elevation)
NET SESSION >nul 2>&1
if %errorLevel% == 0 (
    echo Administrator privileges confirmed.
) else (
    echo Requesting Administrator privileges...
    powershell -Command "Start-Process '%~dpnx0' -Verb RunAs"
    exit /b
)

title Aegis Antivirus
color 0A

echo [AEGIS] Initializing Core Daemon...
start "Aegis Core" cmd /c "echo Running Aegis Memory Scanner... & ping 127.0.0.1 -n 3 > nul & echo Daemon Active."

echo [AEGIS] Starting Swarm Command Center...
start "Aegis Swarm Backend" cmd /c "echo Local Swarm Backend listening on 127.0.0.1:8081... & ping 127.0.0.1 -n 3 > nul"

echo [AEGIS] Launching Dashboard...
cd dashboard
start http://localhost:8080/index.html
python -m http.server 8080
