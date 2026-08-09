/*
 * Account dropdown & authentication session state management.
 * Include this file after the dropdown markup (or use `defer`).
 */
document.addEventListener("DOMContentLoaded", () => {
    const sessionKey = "devcoreActiveSession"; // Updated to match your platform
    const accountItems = [
        document.getElementById("driverHeader"), // (You can rename this ID in HTML later if needed)
        document.getElementById("settingsLink"),
        document.getElementById("logoutBtn")
    ].filter(Boolean);
    const username = document.getElementById("dropdownUsername");
    const signInBtn = document.getElementById("signInBtn");
    const userProfileDropdown = document.getElementById("userProfileDropdown");

    function updateAccountMenu() {
        const developerName = localStorage.getItem(sessionKey);
        const isSignedIn = Boolean(developerName);

        // Toggle account menu items visibility
        accountItems.forEach((item) => {
            item.style.display = isSignedIn ? "block" : "none";
        });

        // Update username text if element exists
        if (username) {
            username.textContent = isSignedIn ? developerName : "";
        }

        // Toggle between "Sign In" button and User Avatar/Dropdown
        if (signInBtn && userProfileDropdown) {
            if (isSignedIn) {
                signInBtn.classList.add("hidden");
                userProfileDropdown.classList.remove("hidden");
            } else {
                signInBtn.classList.remove("hidden");
                userProfileDropdown.classList.add("hidden");
            }
        }
    }

    // Run on initial page load
    updateAccountMenu();

    // Logout button handler
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem(sessionKey);
            updateAccountMenu();
            window.location.href = "index.html"; // Redirect home on logout
        });
    }

    // Keep menu in sync if sign-in/sign-out happens in another tab
    window.addEventListener("storage", (event) => {
        if (event.key === sessionKey) {
            updateAccountMenu();
        }
    });
});