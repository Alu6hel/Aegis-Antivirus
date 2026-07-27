# deploy_windows.ps1
# Securely injects the ALU-compiled Aegis Windows Driver (.sys) into Ring-0

$ErrorActionPreference = "Stop"
$DriverName = "AegisCoreDriver"
$DriverPath = Join-Path $PWD "windows_driver.sys"

Write-Host "[Aegis Deploy] Initiating Windows Ring-0 Sandbox Injection..." -ForegroundColor Cyan

# Check if driver file exists
if (-not (Test-Path $DriverPath)) {
    Write-Host "[!] Error: windows_driver.sys not found! Run the ALU compiler first." -ForegroundColor Red
    exit 1
}

# Stop and delete existing service if it exists
$svc = Get-Service -Name $DriverName -ErrorAction SilentlyContinue
if ($svc) {
    Write-Host "[Aegis Deploy] Stopping existing driver instance..." -ForegroundColor Yellow
    sc.exe stop $DriverName | Out-Null
    sc.exe delete $DriverName | Out-Null
}

Write-Host "[Aegis Deploy] Registering Driver with Service Control Manager..."
sc.exe create $DriverName binPath= $DriverPath type= kernel start= demand | Out-Null

Write-Host "[Aegis Deploy] Booting Driver into SSDT..." -ForegroundColor Green
sc.exe start $DriverName | Out-Null

Write-Host "[Aegis Deploy] SUCCESS: Aegis Ring-0 Driver is now active." -ForegroundColor Green
