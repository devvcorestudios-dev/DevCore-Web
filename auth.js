/*
 * DevCore Studios - Authentication & Account Dropdown Logic
 */
document.addEventListener("DOMContentLoaded", () => {
    // 1. Session Configuration
    const sessionKey = "devcoreActiveSession"; // Stores the active user object or name
    
    // 2. Select Core Elements from your HTML
    const signInBtn = document.getElementById("signInBtn");
    const userMenuWrapper = document.querySelector(".user-menu"); // The wrapper containing DS toggle & panel
    const userToggle = document.querySelector(".user-toggle");       // The "DS" button avatar
    const accountMenu = document.getElementById("account-menu");     // The dropdown panel
    const logoutBtn = document.querySelector(".menu-item.logout");   // The logout button inside panel

    // Select the dropdown text elements for name and email
    const dropdownUsername = document.querySelector(".user-menu-username"); // e.g., "Lead Developer" placeholder element
    const dropdownEmail = document.querySelector(".user-menu-email");       // e.g., email placeholder element
    const avatarText = document.querySelector(".avatar-text");              // Initials display inside the DS avatar

    // 3. Main State Handler Function
    function updateAccountMenu() {
        const rawSession = localStorage.getItem(sessionKey);
        const isSignedIn = Boolean(rawSession);

        if (isSignedIn) {
            // User IS signed in: Show DS avatar menu, Hide Sign In button
            if (signInBtn) signInBtn.style.display = "none";
            if (userMenuWrapper) userMenuWrapper.style.display = "inline-block";

            // Parse user details safely (supporting object or fallback string)
            let userName = "DevCore User";
            let userEmail = "user@devcore.studio";

            try {
                const userData = JSON.parse(rawSession);
                if (userData) {
                    userName = userData.user || userData.name || userName;
                    userEmail = userData.email || userEmail;
                }
            } catch (e) {
                userName = rawSession;
            }

            // Dynamically inject real Username and Email into the dropdown card
            if (dropdownUsername) dropdownUsername.textContent = userName;
            if (dropdownEmail) dropdownEmail.textContent = userEmail;

            // Dynamically calculate and update avatar initials (e.g., "Avinash Vyas" -> "AV")
            if (avatarText && userName) {
                const initials = userName
                    .trim()
                    .split(" ")
                    .map(n => n[0])
                    .join("")
                    .toUpperCase()
                    .substring(0, 2);
                avatarText.textContent = initials;
            }

        } else {
            // User IS NOT signed in: Show Sign In button, Hide DS avatar menu
            if (signInBtn) signInBtn.style.display = "inline-block";
            if (userMenuWrapper) userMenuWrapper.style.display = "none";
            
            // Reset to default placeholders when signed out
            if (dropdownUsername) dropdownUsername.textContent = "Lead Developer";
            if (dropdownEmail) dropdownEmail.textContent = "lead@devcore.studio";
            if (avatarText) avatarText.textContent = "DS";

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
            e.stopPropagation(); 
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
            localStorage.removeItem("currentUser");
            updateAccountMenu();
            window.location.href = "index.html"; 
        });
    }

    // 6. Cross-Tab Syncing
    window.addEventListener("storage", (event) => {
        if (event.key === sessionKey) {
            updateAccountMenu();
        }
    });
});