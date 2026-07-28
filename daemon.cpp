#define UNICODE
#define _UNICODE
#include <windows.h>
#include <string>

// Window Procedure to handle OS events
LRESULT CALLBACK WindowProc(HWND hwnd, UINT uMsg, WPARAM wParam, LPARAM lParam) {
    switch (uMsg) {
        case WM_DESTROY:
            PostQuitMessage(0);
            return 0;
        case WM_PAINT: {
            PAINTSTRUCT ps;
            HDC hdc = BeginPaint(hwnd, &ps);
            
            // Set black background (Cyberpunk Aesthetic)
            HBRUSH brush = CreateSolidBrush(RGB(10, 10, 15));
            FillRect(hdc, &ps.rcPaint, brush);
            DeleteObject(brush);
            
            // Draw Holographic Radar Text
            SetTextColor(hdc, RGB(0, 243, 255)); // Neon Blue
            SetBkMode(hdc, TRANSPARENT);
            
            HFONT hFont = CreateFont(24, 0, 0, 0, FW_BOLD, FALSE, FALSE, FALSE, ANSI_CHARSET, 
                                     OUT_TT_PRECIS, CLIP_DEFAULT_PRECIS, DEFAULT_QUALITY, 
                                     DEFAULT_PITCH | FF_DONTCARE, TEXT("Consolas"));
            SelectObject(hdc, hFont);
            
            std::wstring text = L"[AEGIS DECENTRALIZED IMMUNE SYSTEM]\n\n"
                                L"-> Ring-0 Hypervisor: ONLINE\n"
                                L"-> Kybalion Swarm DHT: CONNECTED\n"
                                L"-> Holographic Radar: ACTIVE\n\n"
                                L"Zero-Day Threats Detected: 0\n"
                                L"System is secure.";
            
            RECT rect;
            GetClientRect(hwnd, &rect);
            rect.left += 20;
            rect.top += 20;
            DrawTextW(hdc, text.c_str(), -1, &rect, DT_LEFT | DT_TOP);
            
            DeleteObject(hFont);
            EndPaint(hwnd, &ps);
            return 0;
        }
    }
    return DefWindowProc(hwnd, uMsg, wParam, lParam);
}

int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR pCmdLine, int nCmdShow) {
    const wchar_t CLASS_NAME[] = L"AegisHolographicRadarClass";
    
    WNDCLASS wc = { };
    wc.lpfnWndProc = WindowProc;
    wc.hInstance = hInstance;
    wc.lpszClassName = CLASS_NAME;
    
    RegisterClass(&wc);
    
    // Create the Desktop Window
    HWND hwnd = CreateWindowEx(
        0, CLASS_NAME, L"Aegis Antivirus - Holographic Radar",
        WS_OVERLAPPEDWINDOW, CW_USEDEFAULT, CW_USEDEFAULT, 800, 600,
        NULL, NULL, hInstance, NULL
    );
    
    if (hwnd == NULL) return 0;
    
    ShowWindow(hwnd, nCmdShow);
    
    // Run the message loop
    MSG msg = { };
    while (GetMessage(&msg, NULL, 0, 0)) {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }
    
    return 0;
}
