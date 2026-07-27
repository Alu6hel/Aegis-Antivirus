document.addEventListener('DOMContentLoaded', () => {
    const threatCountEl = document.getElementById('threat-count');
    const logContainer = document.getElementById('log-container');
    
    let threatsBlocked = 0;
    
    const scanPaths = [
        "C:\\Windows\\System32\\ntoskrnl.exe",
        "C:\\Users\\Alu\\Downloads\\unknown_payload.bin",
        "Memory Segment 0x7FFA8...",
        "Registry HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run",
        "Process ID: 4192 (svchost.exe)"
    ];

    function addLog(message, isThreat = false) {
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        
        const timestamp = new Date().toISOString().split('T')[1].substring(0, 12);
        
        if (isThreat) {
            logEntry.innerHTML = `<span style="color: #ff4c4c;">[${timestamp}] ⚠ ${message}</span>`;
            document.body.style.boxShadow = "inset 0 0 50px rgba(255, 76, 76, 0.4)";
            setTimeout(() => {
                document.body.style.boxShadow = "none";
            }, 500);
        } else {
            logEntry.innerHTML = `<span style="color: #00ffcc;">[${timestamp}]</span> ${message}`;
        }
        
        logContainer.prepend(logEntry);
        
        // Keep log from growing forever
        if (logContainer.children.length > 50) {
            logContainer.removeChild(logContainer.lastChild);
        }
    }

    // Simulate Live Memory Scanning
    setInterval(() => {
        const randomPath = scanPaths[Math.floor(Math.random() * scanPaths.length)];
        addLog(`Scanning: ${randomPath} - SECURE`);
    }, 1200);

    // Simulate Intercepting a Threat occasionally
    setInterval(() => {
        addLog("CRITICAL: Polymorphic payload detected in memory! (dummy_virus.exe)", true);
        addLog("ACTION: Payload neutralized via Z3 Bounds Enforcement.", true);
        threatsBlocked++;
        threatCountEl.textContent = threatsBlocked;
    }, 8500);

    // Try to fetch real status from local json (if daemon actually runs and drops it)
    setInterval(() => {
        fetch('aegis_status.json')
            .then(response => response.ok ? response.json() : null)
            .then(data => {
                if (data && data.status === "THREAT_NEUTRALIZED") {
                    addLog("NATIVE INTERCEPT: Real malware blocked by Aegis Daemon!", true);
                    threatsBlocked++;
                    threatCountEl.textContent = threatsBlocked;
                    fetch('aegis_status.json', { method: 'DELETE' }).catch(() => {});
                }
            }).catch(() => {});
    }, 2000);
});
