document.addEventListener("DOMContentLoaded", () => {
    const sessionKey = "devcoreActiveSession";
    const signInBtn = document.getElementById("signInBtn");
    const userMenuWrapper = document.getElementById("userMenuWrapper");
    const userToggle = document.querySelector(".user-toggle");
    const accountMenu = document.getElementById("account-menu");
    const logoutBtn = document.getElementById("logoutBtn");

    function updateAuthState() {
        const developerName = localStorage.getItem(sessionKey);
        const isSignedIn = Boolean(developerName);

        if (isSignedIn) {
            // Hide Sign In button, show Avatar Menu
            if (signInBtn) signInBtn.style.display = "none";
            if (userMenuWrapper) userMenuWrapper.style.display = "block";
        } else {
            // Show Sign In button, hide Avatar Menu
            if (signInBtn) signInBtn.style.display = "inline-block";
            if (userMenuWrapper) userMenuWrapper.style.display = "none";
        }
    }

    // Run on initial load
    updateAuthState();

    // Toggle dropdown panel when clicking the "DS" avatar button
    if (userToggle && accountMenu) {
        userToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            const isExpanded = userToggle.getAttribute("aria-expanded") === "true";
            userToggle.setAttribute("aria-expanded", !isExpanded);
            accountMenu.classList.toggle("active");
        });

        // Close dropdown when clicking outside
        document.addEventListener("click", () => {
            if (userToggle) userToggle.setAttribute("aria-expanded", "false");
            if (accountMenu) accountMenu.classList.remove("active");
        });

        accountMenu.addEventListener("click", (e) => {
            e.stopPropagation();
        });
    }

    // Logout handling
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem(sessionKey);
            updateAuthState();
            window.location.href = "index.html";
        });
    }

    // Sync across tabs
    window.addEventListener("storage", (event) => {
        if (event.key === sessionKey) {
            updateAuthState();
        }
    });
});