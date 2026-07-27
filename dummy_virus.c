#include <stdio.h>
#include <stdlib.h>
#include <windows.h>

// A harmless dummy virus payload to trigger Aegis Heuristics.
// It attempts to allocate a suspicious block of memory simulating polymorphic unpacking.

int main() {
    printf("[Dummy Virus] Executing payload...\n");
    
    // Simulate polymorphic unpacking signature
    unsigned char* suspicious_payload = (unsigned char*)malloc(4096);
    
    if (suspicious_payload != NULL) {
        printf("[Dummy Virus] Allocated hidden memory region. Awaiting execution...\n");
        // In a real scenario, Aegis SSDT hooks would intercept this allocation
        // and scan the payload signatures.
        
        Sleep(5000); // Wait for Aegis to intercept
        
        free(suspicious_payload);
    }
    
    return 0;
}
