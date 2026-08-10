// ==========================================
// 📝 SIGNUP FORM HANDLER
// ==========================================
async function handleSignup(event) {
    event.preventDefault();
    
    // Use optional chaining (?.) so it never crashes if an element is missing on a page
    const user = document.getElementById('username')?.value || document.getElementById('signupName')?.value;
    const email = document.getElementById('email')?.value || document.getElementById('signupEmail')?.value;
    const phone = document.getElementById('phone')?.value || document.getElementById('signupPhone')?.value;
    const password = document.getElementById('password')?.value || document.getElementById('signupPassword')?.value;
    const confirmPassword = document.getElementById('confirmPassword')?.value || document.getElementById('signupConfirmPassword')?.value;

    if (!user || !email || !password) {
        alert("Please fill out all required fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match! Please verify your password.");
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include', // <-- CRITICAL: Allows secure cookies to be set
            body: JSON.stringify({ user, email, phone, password })
        });

        const data = await response.json();
        if (response.ok && (data.success !== false)) {
            alert("Registration successful! Check your inbox for your welcome email.");
            window.location.href = "login.html";
        } else {
            alert("Signup failed: " + (data.message || "Email might already be registered."));
        }
    } catch (error) {
        console.error("Network error:", error);
        alert("Could not connect to the backend server.");
    }
}

// ==========================================
// 🔐 LOGIN FORM HANDLER
// ==========================================
async function handleLogin(event) {
    event.preventDefault();
    
    // Support multiple possible ID names across different HTML layouts safely
    const emailInput = document.getElementById('loginEmail') || document.getElementById('email') || document.getElementById('developerName');
    const passwordInput = document.getElementById('loginPassword') || document.getElementById('password');

    const email = emailInput ? emailInput.value.trim() : "";
    const password = passwordInput ? passwordInput.value : "";

    if (!email || !password) {
        alert("Please enter both your email/username and password.");
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include', // <-- CRITICAL: Tells the browser to accept the incoming HttpOnly JWT Cookie
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            // UI State only: The actual JWT token is securely locked in the browser's cookie storage, not here.
            localStorage.setItem("devcoreActiveSession", JSON.stringify({
                user: data.username || data.user || email,
                email: data.email || email,
                userId: data.userId
            }));

            alert("Login successful! Check your email for workspace verification.");
            window.location.href = "index.html";
        } else {
            alert("User not found or credentials wrong, please try again with precision.");
        }
    } catch (error) {
        console.error("Network error:", error);
        alert("Could not connect to the backend server.");
    }
}