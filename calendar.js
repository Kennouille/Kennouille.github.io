import { addEvent, getEventsForDate } from './events';

// Fonction pour afficher les événements dans l'agenda quotidien
function displayEvents(events) {
  const agenda = document.getElementById('agenda');
  agenda.innerHTML = ''; // Vider l'agenda

  events.forEach(event => {
    const eventElement = document.createElement('div');
    eventElement.textContent = `${event.Hora}:${event.Min} - ${event.Nombre} @ ${event.Lugar}`;
    agenda.appendChild(eventElement);
  });
}

// Fonction pour gérer le changement de date
async function onDateChange(newDate) {
  const events = await getEventsForDate(newDate);
  displayEvents(events);
}

// Gérer la soumission du formulaire pour ajouter un événement
document.getElementById('eventForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const event = {
    Fecha: document.getElementById('Fecha').value,
    Hora: document.getElementById('Hora').value,
    Min: parseInt(document.getElementById('Min').value, 10),
    Telefono: document.getElementById('Telefono').value,
    Nombre: document.getElementById('Nombre').value,
    Lugar: document.getElementById('Lugar').value,
    Precio: parseFloat(document.getElementById('Precio').value),
    Trabajo: document.getElementById('Trabajo').value,
    user_id: 'some-unique-user-id' // Remplacez par l'ID utilisateur approprié
  };

  await addEvent(event);

  // Mettre à jour l'affichage des événements après l'ajout
  const selectedDate = document.getElementById('calendar').value;
  if (selectedDate) {
    onDateChange(selectedDate);
  }
});

// Exemple d'utilisation avec un calendrier (vous pouvez adapter selon votre bibliothèque de calendrier)
document.getElementById('calendar').addEventListener('change', (e) => {
  const selectedDate = e.target.value; // Supposons que la date soit au format YYYY-MM-DD
  onDateChange(selectedDate);
});

// Charger les événements pour la date actuelle au chargement de la page
document.addEventListener('DOMContentLoaded', async () => {
  const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
  const events = await getEventsForDate(today);
  displayEvents(events);
});
