let attempts = 0;
const maxAttempts = 3;
const blockDuration = 10 * 60 * 100; // 10 minutes en millisecondes
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
        showMessage("Vous êtes bloqué. Réessayez plus tard.");
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
            showMessage("Vous êtes bloqué pour 1 minutes.");
        } else {
            showMessage(`Code incorrect. Tentatives restantes : ${maxAttempts - attempts}`);
        }
    }
}

function showMessage(message) {
    document.getElementById('message').innerText = message;
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}
