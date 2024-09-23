import { addEvent_quot, getEvent_quotForDate } from './event_quot';

// Fonction pour afficher les événements dans l'agenda quotidien
function displayEvent_quot(event_quot) {
  const agenda = document.getElementById('agenda');
  agenda.innerHTML = ''; // Vider l'agenda

  event_quot.forEach(event_quot => {
    const eventElement = document.createElement('div');
    eventElement.textContent = `${event.Hora}:${event.Min} - ${event.Nombre} @ ${event.Lugar}`;
    agenda.appendChild(eventElement);
  });
}

// Fonction pour gérer le changement de date
async function onDateChange(newDate) {
  const event_quot = await getEvent_quotForDate(newDate);
  displayEvent_quot(event_quot);
}

// Gérer la soumission du formulaire pour ajouter un événement
document.getElementById('event_quotForm').addEvent_quotListener('submit', async (e) => {
  e.preventDefault();

  const event_quot = {
    Fecha: document.getElementById('Fecha').value,
    Hora: document.getElementById('Hora').value,
    Min: parseInt(document.getElementById('Min').value, 10),
    Telefono: document.getElementById('Telefono').value,
    Nombre: document.getElementById('Nombre').value,
    Lugar: document.getElementById('Lugar').value,
    Precio: parseFloat(document.getElementById('Precio').value),
    Trabajo: document.getElementById('Trabajo').value,
  };

  await addEvent_quot(event_quot);

  // Mettre à jour l'affichage des événements après l'ajout
  const selectedDate = document.getElementById('calendar').value;
  if (selectedDate) {
    onDateChange(selectedDate);
  }
});

// Exemple d'utilisation avec un calendrier (vous pouvez adapter selon votre bibliothèque de calendrier)
document.getElementById('calendar').addEvent_quotListener('change', (e) => {
  const selectedDate = e.target.value; // Supposons que la date soit au format YYYY-MM-DD
  onDateChange(selectedDate);
});

// Charger les événements pour la date actuelle au chargement de la page
document.addEvent_quotListener('DOMContentLoaded', async () => {
  const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
  const event_quot = await getEvent_quotForDate(today);
  displayEvent_quot(event_quot);
});
