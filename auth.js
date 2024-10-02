let attempts = 0;
const maxAttempts = 3;
const blockDuration = 10 * 60 * 1000; // 10 minutes en millisecondes
let isBlocked = false;

function showCodePrompt() {
    document.getElementById('code-container').style.display = 'block';
}

function checkCode() {
    if (isBlocked) {
        document.getElementById('message').innerText = "Vous êtes bloqué. Réessayez plus tard.";
        return;
    }

    const code = document.getElementById('code').value;
    const correctCode = "votre_code_secret"; // Remplacez par votre code

    if (code === correctCode) {
        window.location.href = 'tableau.html';
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
    // Utilisez EmailJS ou un autre service pour envoyer un e-mail
    emailjs.send("service_4ab7y3s", "template_123abc", {
        to_email: "adresse@example.com",
        message: "L'utilisateur a été bloqué après 3 tentatives incorrectes."
    }).then(response => {
        console.log("E-mail envoyé avec succès", response.status, response.text);
    }).catch(err => {
        console.error("Erreur lors de l'envoi de l'e-mail", err);
        document.getElementById('message').innerText = "Erreur lors de l'envoi de l'e-mail.";
    });
}
