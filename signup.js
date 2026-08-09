// ==========================================
// 📝 SIGNUP PAGE LOGIC & HOOK
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
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

    // Form Submit Hook for registration.html / signup.html
    const signupForm = document.getElementById("registrationForm");
    if (signupForm) {
        signupForm.addEventListener("submit", handleSignup);
    }
});

async function handleSignup(event) {
    event.preventDefault();
    
    // Grab ALL input fields matching your HTML IDs
    const user = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Frontend validation check
    if (password !== confirmPassword) {
        alert("Passwords do not match. Please verify.");
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user, email, phone, password })
        });

        const data = await response.json();
        if (response.ok) {
            alert("Registration successful! Check your inbox for your welcome email.");
            window.location.href = "login.html";
        } else {
            alert("Signup failed: " + (data.message || "Email might already be registered."));
        }
    } catch (error) {
        console.error("Network error:", error);
        alert("Could not connect to the backend server.");
    }

    if (username) {
                    gsap.to(".register-container", { scale: 0.98, opacity: 0, duration: 0.3, onComplete: () => {
                        window.location.href = "index.html";
                    }});
                }
}