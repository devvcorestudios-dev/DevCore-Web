document.addEventListener("DOMContentLoaded", () => {
    const deploymentSequence = [
        // PART 1: The Production Server Build Steps
        { type: "command", text: "git clone git@github.com:devcore/client-repo.git" },
        { type: "response", text: "Cloning into 'client-repo'... remote: Enumerating objects: 142, done." },
        { type: "command", text: "npm install --production" },
        { type: "response", text: "added 84 packages, and audited 85 packages in 2s. All dependencies secure." },
        { type: "command", text: "docker build -t devcore/client-prod ." },
        { type: "response", text: "Building layer 4/4 [==================>] 48.2MB / 48.2MB - Optimized [OK]" },
        { type: "command", text: "nginx -s reload && certbot --renew" },
        { type: "response", text: "Provisioning SSL certificates... Active. Domain routing online." },
        
        // PART 2: Your Fedora & Git Workspace History Sequence
        { type: "command", text: "cd /home/avinash/Desktop/DevCore-Studios/DevCore_1" },
        { type: "response", text: "bash: cd: navigating workspace directories..." },
        { type: "command", text: "touch .gitignore && nano .gitignore" },
        { type: "response", text: "Generated production-grade .gitignore exclusion rules [OK]" },
        { type: "command", text: "git init" },
        { type: "response", text: "Hint: Initialized empty Git repository in /opt/devcore/workspace/.git/" },
        { type: "command", text: "git status" },
        { type: "response", text: "On branch master\nNo commits yet\nUntracked files: .gitignore" },
        { type: "command", text: "git add ." },
        { type: "response", text: "Staged changes for initial root commit." },
        { type: "command", text: "git commit -m \"feat: initialize agency production codebase\"" },
        { type: "response", text: "[master (root-commit)] a887d16: 1 file changed, 26 insertions(+)" },
        { type: "command", text: "git remote add origin https://github.com/devcore-studios/devcore-webpage.git" },
        { type: "response", text: "Remote tracking branch successfully configured." },
        { type: "command", text: "git push -u origin master" },
        { type: "response", text: "Enumerating objects: 3, done. Compressing objects: 100% (2/2) - done." },
        { type: "success", text: "✓ To github.com:devcore-studios/devcore-webpage.git \n * [new branch] master -> master" },
        { type: "success", text: "🚀 GitHub Actions: pages-build-deployment (#18) triggered successfully [ONLINE]" }
    ];

    const terminalBody = document.getElementById("terminal-content");
    let currentIndex = 0;

    function runTerminalLoop() {
        if (!terminalBody) return;
        terminalBody.innerHTML = "";
        currentIndex = 0;
        printNextLog();
    }

    function printNextLog() {
        if (currentIndex < deploymentSequence.length) {
            const item = deploymentSequence[currentIndex];
            const line = document.createElement("div");
            line.className = "terminal-line";

            if (item.type === "command") {
                const prompt = document.createElement("span");
                prompt.className = "prompt";
                prompt.textContent = "avinash@fedora:~$ ";
                
                const text = document.createElement("span");
                text.className = "command-text";
                text.textContent = item.text;
                
                line.appendChild(prompt);
                line.appendChild(text);
            } else if (item.type === "response") {
                const resText = document.createElement("span");
                resText.className = "response-text";
                resText.style.whiteSpace = "pre-line"; 
                resText.textContent = item.text;
                line.appendChild(resText);
            } else if (item.type === "success") {
                const succText = document.createElement("span");
                succText.className = "success-text";
                succText.style.whiteSpace = "pre-line";
                succText.textContent = item.text;
                line.appendChild(succText);
            }

            terminalBody.appendChild(line);
            terminalBody.scrollTop = terminalBody.scrollHeight;

            currentIndex++;
            setTimeout(printNextLog, 450);
        } else {
            setTimeout(runTerminalLoop, 6000);
        }
    }

    runTerminalLoop();
});