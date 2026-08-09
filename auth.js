/*
 * DevCore Studios - Authentication & Account Dropdown Logic
 */
document.addEventListener("DOMContentLoaded", () => {
    // 1. Session Configuration (Matches your DevCore session storage key)
    const sessionKey = "devcoreActiveSession";
    
    // 2. Select Core Elements from your HTML
    const signInBtn = document.getElementById("signInBtn");
    const userMenuWrapper = document.querySelector(".user-menu"); // The wrapper containing the DS toggle & panel
    const userToggle = document.querySelector(".user-toggle");       // The "DS" button
    const accountMenu = document.getElementById("account-menu");     // The dropdown panel
    const logoutBtn = document.querySelector(".menu-item.logout");   // The logout button inside panel

    // 3. Main State Handler Function
    function updateAccountMenu() {
        const developerName = localStorage.getItem(sessionKey);
        const isSignedIn = Boolean(developerName);

        if (isSignedIn) {
            // User IS signed in: Show DS avatar menu, Hide Sign In button
            if (signInBtn) signInBtn.style.display = "none";
            if (userMenuWrapper) userMenuWrapper.style.display = "inline-block";
        } else {
            // User IS NOT signed in: Show Sign In button, Hide DS avatar menu
            if (signInBtn) signInBtn.style.display = "inline-block";
            if (userMenuWrapper) userMenuWrapper.style.display = "none";
            
            // Ensure dropdown panel is closed when signed out
            if (accountMenu) accountMenu.classList.remove("active");
            if (userToggle) userToggle.setAttribute("aria-expanded", "false");
        }
    }

    // Run check on initial page load
    updateAccountMenu();

    // 4. Toggle Dropdown Panel on "DS" Avatar Click
    if (userToggle && accountMenu) {
        userToggle.addEventListener("click", (e) => {
            e.stopPropagation(); // Stop click from propagating to window
            const isExpanded = userToggle.getAttribute("aria-expanded") === "true";
            
            userToggle.setAttribute("aria-expanded", !isExpanded);
            accountMenu.classList.toggle("active");
        });

        // Close dropdown when clicking anywhere else on the page
        document.addEventListener("click", () => {
            userToggle.setAttribute("aria-expanded", "false");
            accountMenu.classList.remove("active");
        });

        // Prevent clicks inside the menu box from closing it
        accountMenu.addEventListener("click", (e) => {
            e.stopPropagation();
        });
    }

    // 5. Logout Action Handler
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem(sessionKey);
            updateAccountMenu();
            window.location.href = "index.html"; // Safe redirect home
        });
    }

    // 6. Cross-Tab Syncing (Keeps state updated if changed in another tab)
    window.addEventListener("storage", (event) => {
        if (event.key === sessionKey) {
            updateAccountMenu();
        }
    });
});