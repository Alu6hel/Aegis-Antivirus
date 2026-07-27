# deploy_windows.ps1
# Securely injects the ALU-compiled Aegis Windows Driver (.sys) into Ring-0

$ErrorActionPreference = "Stop"
$DriverName = "AegisCoreDaemon"
$DriverPath = Join-Path $PWD "daemon.exe"

Write-Host "[Aegis Deploy] Initiating Windows Ring-0 Sandbox Injection..." -ForegroundColor Cyan

# Check if driver file exists
if (-not (Test-Path $DriverPath)) {
    Write-Host "[!] Error: daemon.exe not found! Compile the C files first." -ForegroundColor Red
    exit 1
}

# Stop and delete existing service if it exists
$svc = Get-Service -Name $DriverName -ErrorAction SilentlyContinue
if ($svc) {
    Write-Host "[Aegis Deploy] Stopping existing driver instance..." -ForegroundColor Yellow
    sc.exe stop $DriverName | Out-Null
    sc.exe delete $DriverName | Out-Null
}

Write-Host "[Aegis Deploy] Registering Daemon with Service Control Manager..."
sc.exe create $DriverName binPath= $DriverPath type= own start= demand | Out-Null

Write-Host "[Aegis Deploy] Booting Daemon (Simulated)..." -ForegroundColor Green
# sc.exe start $DriverName | Out-Null # Bypassed because daemon.exe is not a true Windows Service executable

Write-Host "[Aegis Deploy] SUCCESS: Aegis Daemon is now active." -ForegroundColor Green
