/*
 * Account dropdown visibility & authentication state management.
 */
document.addEventListener("DOMContentLoaded", () => {
    const sessionKey = "devcoreActiveSession";
    const accountMenu = document.getElementById("account-menu");
    const userToggle = document.querySelector(".user-toggle");
    const logoutBtn = document.querySelector(".menu-item.logout");
    const signInBtn = document.getElementById("signInBtn"); // Add this if you have a sign-in button, or let it handle the toggle

    function updateAccountMenu() {
        const developerName = localStorage.getItem(sessionKey);
        const isSignedIn = Boolean(developerName);

        // Toggle the visibility of the account dropdown panel based on login state
        if (accountMenu) {
            // If signed in, keep panel ready; if not, you can choose to hide/show parts
            accountMenu.style.display = isSignedIn ? "block" : "none"; 
        }

        // If you have a user toggle button (the "DS" circle), hide/show it based on auth
        if (userToggle) {
            userToggle.style.display = isSignedIn ? "flex" : "none";
        }
    }

    // Run on page load
    updateAccountMenu();

    // Toggle dropdown panel when clicking the "DS" avatar button
    if (userToggle && accountMenu) {
        userToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            const isExpanded = userToggle.getAttribute("aria-expanded") === "true";
            userToggle.setAttribute("aria-expanded", !isExpanded);
            accountMenu.classList.toggle("active"); // Or toggle display
        });

        // Close dropdown when clicking outside
        document.addEventListener("click", () => {
            userToggle.setAttribute("aria-expanded", "false");
            accountMenu.classList.remove("active");
        });

        accountMenu.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent closing when clicking inside menu
        });
    }

    // Logout button handler
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem(sessionKey);
            updateAccountMenu();
            window.location.href = "index.html"; // Redirect home on logout
        });
    }

    // Keep menu in sync if state changes in another tab
    window.addEventListener("storage", (event) => {
        if (event.key === sessionKey) {
            updateAccountMenu();
        }
    });
});