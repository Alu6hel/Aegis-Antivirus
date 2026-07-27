document.addEventListener('DOMContentLoaded', () => {
    const logContainer = document.getElementById('log-container');
    const threatCountElement = document.getElementById('threat-count');
    
    let threatCount = 0;

    const dummyThreats = [
        "Memory injection detected in svchost.exe",
        "Polymorphic payload intercepted at 0x004A2F90",
        "Rootkit hook blocked in SSDT table",
        "Suspicious JNI Env modification halted",
        "Zero-day heuristic signature triggered",
        "Unauthorized registry modification prevented"
    ];

    function addLogEntry(message, isDanger = false) {
        const entry = document.createElement('div');
        entry.className = `log-entry ${isDanger ? 'danger' : ''}`;
        
        const time = new Date().toLocaleTimeString();
        
        entry.innerHTML = `
            <span class="log-message">${message}</span>
            <span class="log-time">${time}</span>
        `;
        
        logContainer.prepend(entry);
        
        // Keep only last 50 logs
        if (logContainer.children.length > 50) {
            logContainer.lastChild.remove();
        }

        if (isDanger) {
            threatCount++;
            threatCountElement.textContent = threatCount;
            threatCountElement.style.textShadow = '0 0 30px #ff4b4b';
            setTimeout(() => {
                threatCountElement.style.textShadow = '0 0 20px rgba(102, 252, 241, 0.5)';
            }, 300);
        }
    }

    // Initial setup logs
    addLogEntry("Aegis Dashboard Initialized.");
    addLogEntry("Connecting to local ALU Daemon via IPC...");
    setTimeout(() => addLogEntry("Connected. Hoare-logic verifier active.", false), 1000);

    // Simulate incoming threats for the UI demo
    setInterval(() => {
        if (Math.random() > 0.7) {
            const threat = dummyThreats[Math.floor(Math.random() * dummyThreats.length)];
            addLogEntry(`[BLOCK] ${threat}`, true);
        } else {
            addLogEntry("Routine memory sweep completed. Safe.");
        }
    }, 4500);
});
