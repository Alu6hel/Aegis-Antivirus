document.addEventListener('DOMContentLoaded', () => {
    const statusText = document.getElementById('status-text');
    const logsList = document.getElementById('logs');
    
    // Animate UI elements on load
    setTimeout(() => {
        statusText.style.opacity = '1';
        statusText.style.transform = 'translateY(0)';
    }, 500);

    let threatDetected = false;

    // Local JSON Bridge Polling
    // The Aegis Core Daemon (C -> .exe) writes to aegis_status.json when a threat is neutralized
    setInterval(() => {
        if (threatDetected) return;

        fetch('aegis_status.json')
            .then(response => {
                if (!response.ok) return null;
                return response.json();
            })
            .then(data => {
                if (data && data.status === "THREAT_NEUTRALIZED") {
                    threatDetected = true;
                    triggerThreatAlert();
                }
            })
            .catch(err => console.log("Waiting for Aegis daemon..."));
    }, 1000);

    function triggerThreatAlert() {
        statusText.textContent = "THREAT NEUTRALIZED";
        statusText.style.color = "#ff4c4c"; // Red neon alert
        
        document.body.style.boxShadow = "inset 0 0 100px rgba(255, 76, 76, 0.2)";
        
        const logEntry = document.createElement('li');
        logEntry.textContent = `[${new Date().toLocaleTimeString()}] Malicious memory allocation intercepted (dummy_virus.c). Process terminated.`;
        logEntry.style.color = "#ff4c4c";
        
        logsList.appendChild(logEntry);
        
        // Reset status json so it doesn't loop forever (simulated for frontend demo)
        fetch('aegis_status.json', { method: 'DELETE' }).catch(() => {});
    }
});
