import supabase from './supabaseClient';

// Fonction pour ajouter un événement
export async function addEvent(event) {
  const { data, error } = await supabase
    .from('event_quot')
    .insert([event]);

  if (error) {
    console.error('Error adding event:', error);
  } else {
    console.log('Event added:', data);
  }
}

// Fonction pour récupérer les événements pour une date donnée
export async function getEvent_quotForDate(date) {
  const { data, error } = await supabase
    .from('event_quot')
    .select('*')
    .eq('Fecha', date);

  if (error) {
    console.error('Error fetching event_quot:', error);
    return [];
  }
  return data;
}
