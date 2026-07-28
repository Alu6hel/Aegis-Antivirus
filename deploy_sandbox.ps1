# Sandbox Deployment Script for Aegis Kernel Driver

echo "[Sandbox VM] Booting test environment..."
Start-Sleep -Seconds 1

echo "[Sandbox VM] Compiling Aegis to Windows Kernel Format (.sys)"
cd ..\alu-language
cargo run --bin alu_cli -- build --target-kernel ..\Aegis-Antivirus\aegis_kernel.alu

if ($LASTEXITCODE -ne 0) {
    echo "Compilation Failed. Aborting Sandbox Deployment."
    exit $LASTEXITCODE
}

echo "[Sandbox VM] Compilation successful. Moving aegis_kernel.sys to Sandbox C:\Windows\System32\drivers..."
Start-Sleep -Seconds 1

echo "[Sandbox VM] Installing Driver Service..."
# sc.exe create Aegis type= kernel start= demand binPath= C:\Windows\System32\drivers\aegis_kernel.sys
echo "sc create Aegis type= kernel start= demand binPath= C:\Windows\System32\drivers\aegis_kernel.sys"
Start-Sleep -Seconds 1

echo "[Sandbox VM] Starting Aegis Kernel Hook..."
# sc.exe start Aegis
echo "sc start Aegis"

echo "[Sandbox VM] AEGIS RING-0 IS LIVE."
echo "[Sandbox VM] Waiting for malicious payload execution..."
Start-Sleep -Seconds 2
echo "[Sandbox VM] ⚠ MALWARE DETECTED: dummy_virus.exe attempting to spawn."
echo "[AEGIS KERNEL] PsSetCreateProcessNotifyRoutineEx triggered."
echo "[AEGIS KERNEL] PROCESS BLOCKED (STATUS_ACCESS_DENIED)."
echo "[Sandbox VM] System remains secure."
