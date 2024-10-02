let attempts = 0;
const maxAttempts = 3;
const blockDuration = 10 * 60 * 100; // 1 minute en millisecondes
let isBlocked = false;
let targetPage = '';

function showCodePrompt() {
    document.getElementById('code-container').style.display = 'block';
    targetPage = 'tableau.html';
}

function showCodePromptJournalier() {
    document.getElementById('code-container').style.display = 'block';
    targetPage = 'journalier.html';
}

function checkCode() {
    if (isBlocked) {
        document.getElementById('message').innerText = "Vous êtes bloqué. Réessayez plus tard.";
        return;
    }

    const code = document.getElementById('code').value.trim();
    const correctCode = "109801"; // Remplacez par votre code


    if (code === correctCode) {
        window.location.href = targetPage;
    } else {
        attempts++;
        if (attempts >= maxAttempts) {
            isBlocked = true;
            setTimeout(() => {
                isBlocked = false;
                attempts = 0;
            }, blockDuration);
            sendEmail();
            document.getElementById('message').innerText = "Vous êtes bloqué pour 10 minutes.";
        } else {
            document.getElementById('message').innerText = `Code incorrect. Tentatives restantes : ${maxAttempts - attempts}`;
        }
    }
}