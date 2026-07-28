document.addEventListener('DOMContentLoaded', () => {
    const threatCountEl = document.getElementById('threat-count');
    const logContainer = document.getElementById('log-container');
    const engineStatusEl = document.getElementById('engine-status');
    
    // New UI Elements
    const btnQuickScan = document.getElementById('btn-quick-scan');
    const btnFullScan = document.getElementById('btn-full-scan');
    const btnStopScan = document.getElementById('btn-stop-scan');
    const toggleRealtime = document.getElementById('toggle-realtime');
    
    let threatsBlocked = 0;
    let isScanning = true;
    let realtimeProtection = true;
    
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
        
        if (logContainer.children.length > 50) {
            logContainer.removeChild(logContainer.lastChild);
        }
    }

    function startScan(type) {
        isScanning = true;
        btnStopScan.disabled = false;
        engineStatusEl.textContent = "SCANNING";
        engineStatusEl.className = "value safe-text";
        addLog(`=== Started ${type} ===`);
    }

    function stopScan() {
        isScanning = false;
        btnStopScan.disabled = true;
        engineStatusEl.textContent = realtimeProtection ? "ACTIVE" : "STANDBY";
        engineStatusEl.className = realtimeProtection ? "value safe-text" : "value";
        addLog("=== Scan Stopped ===");
    }

    // Event Listeners
    btnQuickScan.addEventListener('click', () => startScan('Quick Scan'));
    btnFullScan.addEventListener('click', () => startScan('Full Scan'));
    btnStopScan.addEventListener('click', stopScan);
    
    toggleRealtime.addEventListener('change', (e) => {
        realtimeProtection = e.target.checked;
        if (realtimeProtection) {
            addLog("System Shield: Real-Time Protection ENABLED");
            if (!isScanning) engineStatusEl.textContent = "ACTIVE";
            document.querySelector('.status-indicator').innerHTML = '<span class="dot"></span> SYSTEM SECURE';
            document.querySelector('.status-indicator').style.background = 'rgba(46, 204, 113, 0.1)';
            document.querySelector('.status-indicator').style.color = 'var(--safe)';
        } else {
            addLog("System Shield: Real-Time Protection DISABLED", true);
            if (!isScanning) engineStatusEl.textContent = "STANDBY";
            document.querySelector('.status-indicator').innerHTML = '⚠ PROTECTION DISABLED';
            document.querySelector('.status-indicator').style.background = 'rgba(255, 75, 75, 0.1)';
            document.querySelector('.status-indicator').style.color = 'var(--danger)';
        }
    });

    // Simulate Live Memory Scanning
    setInterval(() => {
        if (!isScanning) return;
        const randomPath = scanPaths[Math.floor(Math.random() * scanPaths.length)];
        addLog(`Scanning: ${randomPath} - SECURE`);
    }, 1200);

    // Live Telemetry from Kybalion DB via Daemon API
    setInterval(() => {
        if (!realtimeProtection && !isScanning) return;
        
        fetch('http://127.0.0.1:8080/api/telemetry')
            .then(res => res.json())
            .then(data => {
                if (data.recent_threats && data.recent_threats.length > 0) {
                    data.recent_threats.forEach(threat => {
                        addLog(`CRITICAL NATIVE INTERCEPT: ${threat.type} (PID: ${threat.pid})`, true);
                        addLog(`ACTION: ${threat.action} via Z3 Bounds Enforcement.`, true);
                        threatsBlocked++;
                        threatCountEl.textContent = threatsBlocked;
                    });
                }
            })
            .catch(err => {
                // Daemon might not be running locally in this mock setup
                // addLog("Daemon disconnected. Trying to reconnect...", true);
            });
    }, 2000);
    // Modal Logic
    const quarantineModal = document.getElementById('quarantine-modal');
    const settingsModal = document.getElementById('settings-modal');
    
    document.getElementById('nav-quarantine').addEventListener('click', (e) => {
        e.preventDefault();
        quarantineModal.style.display = 'block';
    });
    
    document.getElementById('nav-settings').addEventListener('click', (e) => {
        e.preventDefault();
        settingsModal.style.display = 'block';
    });
    
    document.getElementById('btn-close-quarantine').addEventListener('click', () => {
        quarantineModal.style.display = 'none';
    });
    
    document.getElementById('btn-close-settings').addEventListener('click', () => {
        settingsModal.style.display = 'none';
    });
});
