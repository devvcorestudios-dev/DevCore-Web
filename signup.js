// ==========================================
// 📝 SIGNUP PAGE LOGIC & HOOK
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 DOM Loaded: signup.js initialized.");

    // Optional GSAP entrance animation
    if (typeof gsap !== "undefined") {
        gsap.to(".register-container", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            startAt: { y: 30, opacity: 0 }
        });
    }

    // Form Submit Hook
    const signupForm = document.getElementById("registrationForm");
    if (signupForm) {
        console.log("✅ Registration form found and hooked.");
        signupForm.addEventListener("submit", handleSignup);
    } else {
        console.error("❌ CRITICAL ERROR: Could not find 'registrationForm' in the HTML.");
    }
});

async function handleSignup(event) {
    event.preventDefault();
    console.log("⚡ Submit button clicked. Processing payload...");
    
    // Grab ALL input fields
    const user = document.getElementById('username')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim();
    const password = document.getElementById('password')?.value;
    const confirmPassword = document.getElementById('confirmPassword')?.value;

    // Check if any field is missing entirely from the HTML
    if (user === undefined || email === undefined || password === undefined) {
        console.error("❌ ERROR: One or more input IDs do not match the HTML.");
        alert("System Error: Form mapping failed. Check console.");
        return;
    }

    // Frontend validation
    if (password !== confirmPassword) {
        console.warn("⚠️ Passwords do not match.");
        alert("Passwords do not match. Please verify.");
        return;
    }

    console.log(`📤 Sending registration request for: ${email}`);

    try {
        const response = await fetch('http://localhost:8080/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user, email, phone, password })
        });

        console.log(`📥 Server responded with status: ${response.status}`);
        
        // Parse the JSON safely
        const data = await response.json();
        console.log("📦 Server Payload:", data);

        if (response.ok && data.success) {
            alert("Registration successful! Check your inbox for your welcome email.");
            
            // Smooth exit animation
            if (typeof gsap !== "undefined") {
                gsap.to(".register-container", { 
                    scale: 0.98, 
                    opacity: 0, 
                    duration: 0.3, 
                    onComplete: () => {
                        window.location.href = "login.html";
                    }
                });
            } else {
                window.location.href = "login.html";
            }
        } else {
            console.warn("⚠️ Registration rejected by server:", data.message);
            alert("Signup failed: " + (data.message || "Email might already be registered."));
        }
    } catch (error) {
        console.error("🚨 FATAL NETWORK ERROR:", error);
        alert("Could not connect to the backend server. Is Spring Boot running?");
    }
}