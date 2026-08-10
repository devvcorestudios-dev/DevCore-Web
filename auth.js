/*
 * DevCore Studios - Authentication & Account Dropdown Logic
 */
document.addEventListener("DOMContentLoaded", () => {
    // 1. Session Configuration
    const sessionKey = "devcoreActiveSession"; 
    
    // 2. Select Core Elements from your HTML
    const signInBtn = document.getElementById("signInBtn");
    const userMenuWrapper = document.querySelector(".user-menu");
    const userToggle = document.querySelector(".user-toggle");       
    const accountMenu = document.getElementById("account-menu");     
    const logoutBtn = document.querySelector(".menu-item.logout");   

    // UPDATED: Target your existing HTML structure directly
    const dropdownUsername = document.querySelector(".user-summary strong"); 
    const dropdownEmail = document.querySelector(".user-summary span");      

    // 3. Main State Handler Function
    function updateAccountMenu() {
        const rawSession = localStorage.getItem(sessionKey);
        const isSignedIn = Boolean(rawSession);

        if (isSignedIn) {
            // User IS signed in
            if (signInBtn) signInBtn.style.display = "none";
            if (userMenuWrapper) userMenuWrapper.style.display = "inline-block";

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

            // Inject Real Username and Email into your <strong> and <span> tags
            if (dropdownUsername) dropdownUsername.textContent = userName;
            if (dropdownEmail) dropdownEmail.textContent = userEmail;

            // Calculate initials and inject them directly into your <button> text
            if (userToggle && userName) {
                const initials = userName
                    .trim()
                    .split(" ")
                    .map(n => n[0])
                    .join("")
                    .toUpperCase()
                    .substring(0, 2);
                userToggle.textContent = initials; 
            }

        } else {
            // User IS NOT signed in
            if (signInBtn) signInBtn.style.display = "inline-block";
            if (userMenuWrapper) userMenuWrapper.style.display = "none";
            
            // Reset to defaults
            if (dropdownUsername) dropdownUsername.textContent = "Lead Developer";
            if (dropdownEmail) dropdownEmail.textContent = "lead@devcore.studio";
            if (userToggle) userToggle.textContent = "DS";

            // Close menu
            if (accountMenu) accountMenu.classList.remove("active");
            if (userToggle) userToggle.setAttribute("aria-expanded", "false");
        }
    }

    // Run check on initial page load
    updateAccountMenu();

    // 4. Toggle Dropdown Panel on Avatar Click
    if (userToggle && accountMenu) {
        userToggle.addEventListener("click", (e) => {
            e.stopPropagation(); 
            const isExpanded = userToggle.getAttribute("aria-expanded") === "true";
            
            userToggle.setAttribute("aria-expanded", !isExpanded);
            accountMenu.classList.toggle("active");
        });

        document.addEventListener("click", () => {
            userToggle.setAttribute("aria-expanded", "false");
            accountMenu.classList.remove("active");
        });

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