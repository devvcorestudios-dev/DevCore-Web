document.addEventListener("DOMContentLoaded", () => {
    const textToType = "initializing secure deployment pipeline... [OK]";
    const typeWriterElement = document.getElementById("typewriter");
    let index = 0;

    function typeCommand() {
        if (index < textToType.length) {
            typeWriterElement.innerHTML += textToType.charAt(index);
            index++;
            // Randomize typing speed slightly for realism (30ms to 80ms)
            setTimeout(typeCommand, Math.random() * 50 + 30); 
        }
    }

    // Start typing after a short 1-second delay
    setTimeout(typeCommand, 1000);
});