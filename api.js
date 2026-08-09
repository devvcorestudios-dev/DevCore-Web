// ==========================================
// 📝 SIGNUP FORM HANDLER
// ==========================================
async function handleSignup(event) {
    event.preventDefault();
    
    // Grab elements from signup.html
    const user = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('signupPhone').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;

    // Validate matching passwords on the frontend
    if (password !== confirmPassword) {
        alert("Passwords do not match! Please verify your password.");
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
}

// ==========================================
// 🔐 LOGIN FORM HANDLER
// ==========================================
async function handleLogin(event) {
    event.preventDefault();
    
    // Grab elements from login.html
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            alert("Login successful! Check your email for workspace verification.");
            window.location.href = "dashboard.html";
        } else {
            alert("User not found or credentials wrong, please try again with precision.");
        }
    } catch (error) {
        console.error("Network error:", error);
        alert("Could not connect to the backend server.");
    }
}