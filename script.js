document.addEventListener("DOMContentLoaded", () => {
    const steps = [
        "git clone git@github.com:devcore/client-repo.git ... [OK]",
        "resolving dependencies: npm install --production ... [OK]",
        "building docker container: optimizing layers ... [OK]",
        "provisioning SSL certificates & routing Nginx ... [OK]",
        "deployment successful! Live at https://client.devcore.io"
    ];

    const terminalBody = document.getElementById("terminal-content");
    let currentStep = 0;

    function runDeploymentLoop() {
        if (!terminalBody) return;
        terminalBody.innerHTML = ""; // Clear screen for loop restart
        currentStep = 0;
        printNextStep();
    }

    function printNextStep() {
        if (currentStep < steps.length) {
            const line = document.createElement("div");
            line.className = "terminal-line";
            
            const prompt = document.createElement("span");
            prompt.className = "prompt";
            prompt.textContent = "root@devcore:~$ ";
            
            const text = document.createElement("span");
            text.textContent = steps[currentStep];
            
            line.appendChild(prompt);
            line.appendChild(text);
            terminalBody.appendChild(line);

            currentStep++;
            // Delay before typing the next command line
            setTimeout(printNextStep, 800);
        } else {
            // Finished sequence: wait 3 seconds, then clear and loop over
            setTimeout(runDeploymentLoop, 3000);
        }
    }

    runDeploymentLoop();
});