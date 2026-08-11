
        document.getElementById("loginForm").addEventListener("submit", async (e) => {
            e.preventDefault();
            
            // Note: If your backend login expects 'email' instead of name, 
            // make sure your input field type matches your backend requirement.
            const email = document.getElementById("developerName").value.trim(); // Mapping the input field
            const password = document.getElementById("password").value;

            try {
                const response = await fetch('http://localhost:8080/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include', // <-- THIS IS THE MAGIC KEY FOR HTTPONLY COOKIES
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();
                
                if (response.ok && data.success) {
                    // Save the user profile object so auth.js dynamically updates avatar, username, and email
                    localStorage.setItem("devcoreActiveSession", JSON.stringify({
                        user: data.user || data.username || email,
                        email: data.email || email,
                        userId: data.userId
                    }));

                    // Smooth redirect back to home/dashboard
                    window.location.href = "index.html";
                } else {
                    alert("Authentication failed: " + (data.message || "Invalid credentials. Please verify."));
                }
            } catch (error) {
                console.error("Network error:", error);
                alert("Could not connect to the DevCore backend server.");
            }
        });
    