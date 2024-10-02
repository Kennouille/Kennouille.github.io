let attempts = 0;
const maxAttempts = 3;
const blockDuration = 10 * 60 * 100; // 1 minutes en millisecondes
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

function sendEmail() {
    console.log("Envoi de l'e-mail...");
    emailjs.send("service_4ab7y3s", "template_v83qlcw", {
        to_email: "muhlemannk@gmail.com",
        message: "L'utilisateur a été bloqué après 3 tentatives incorrectes."
    }).then(response => {
        console.log("E-mail envoyé avec succès", response.status, response.text);
    }).catch(err => {
        console.error("Erreur lors de l'envoi de l'e-mail", err);
        document.getElementById('message').innerText = "Erreur lors de l'envoi de l'e-mail.";
    });
}

