document.addEventListener('DOMContentLoaded', (event) => {
    let attempts = 0;
    const maxAttempts = 3;
    const blockDuration = 10 * 60 * 1000; // 10 minutes en millisecondes
    let isBlocked = false;
    let targetPage = '';

    function showCodePrompt() {
        document.getElementById('popup').style.display = 'block';
        targetPage = 'tableau.html';
    }

    function showCodePromptJournalier() {
        document.getElementById('popup').style.display = 'block';
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
                showMessage("Vous êtes bloqué pour 10 minutes.");
            } else {
                showMessage(`Code incorrect. Tentatives restantes : ${maxAttempts - attempts}`);
            }
        }
    }

    function showMessage(message) {
        document.getElementById('message').innerText = message;
    }

    function closePopup() {
        document.getElementById('popup').style.display = 'none';
    }

    // Expose functions to global scope
    window.showCodePrompt = showCodePrompt;
    window.showCodePromptJournalier = showCodePromptJournalier;
    window.checkCode = checkCode;
    window.closePopup = closePopup;
});
