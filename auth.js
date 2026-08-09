/*
 * Account dropdown visibility.
 * Include this file after the dropdown markup (or use `defer`).
 */
document.addEventListener("DOMContentLoaded", () => {
    const sessionKey = "activeDriverSession";
    const accountItems = [
        document.getElementById("driverHeader"),
        document.getElementById("settingsLink"),
        document.getElementById("logoutBtn")
    ].filter(Boolean);
    const username = document.getElementById("dropdownUsername");

    function updateAccountMenu() {
        const developerName = localStorage.getItem(sessionKey);
        const isSignedIn = Boolean(developerName);

        // A signed-out dropdown intentionally contains no account options.
        accountItems.forEach((item) => {
            item.style.display = isSignedIn ? "block" : "none";
        });

        if (username) {
            username.textContent = isSignedIn ? developerName : "";
        }
    }

    updateAccountMenu();

    // Keep this menu in sync if sign-in/sign-out happens in another tab.
    window.addEventListener("storage", (event) => {
        if (event.key === sessionKey) updateAccountMenu();
    });
});