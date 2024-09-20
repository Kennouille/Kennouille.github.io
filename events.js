import supabase from './supabaseClient';

// Fonction pour ajouter un événement
export async function addEvent(event) {
  const { data, error } = await supabase
    .from('events')
    .insert([event]);

  if (error) {
    console.error('Error adding event:', error);
  } else {
    console.log('Event added:', data);
  }
}

// Fonction pour récupérer les événements pour une date donnée
export async function getEventsForDate(date) {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('Fecha', date);

  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }
  return data;
}
