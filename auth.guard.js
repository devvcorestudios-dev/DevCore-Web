// ==========================================
// 🛡️ ZERO-TRUST JWT SESSION VALIDATOR
// ==========================================
async function verifySecureSession() {
    try {
        // Ping the backend checkpoint
        const response = await fetch('http://localhost:8080/api/auth/me', {
            method: 'GET',
            credentials: 'include' // CRITICAL: This is what sends the invisible HttpOnly cookie
        });

        if (!response.ok) {
            // The backend rejected the cookie (or it doesn't exist).
            console.warn("Security Alert: Invalid JWT session. Purging local state.");
            
            // Destroy any fake local storage flags a hacker might have made
            localStorage.removeItem('devcoreActiveSession');
            
            // Redirect to login (unless they are just browsing pricing)
            if (!window.location.href.includes('pricing.html')) {
                window.location.href = 'login.html';
            }
        } else {
            // The backend mathematically verified the token
            const data = await response.json();
            console.log("Zero-Trust verification successful for:", data.email);
            
            // Now it is safe to trust the session for this page load
            localStorage.setItem('devcoreActiveSession', JSON.stringify({ email: data.email }));
        }
    } catch (error) {
        console.error("Critical server connection failure:", error);
    }
}

// Run the security check the moment the DOM loads
document.addEventListener('DOMContentLoaded', verifySecureSession);