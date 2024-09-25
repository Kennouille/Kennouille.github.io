import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://mngggybayjooqkzbhvqy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uZ2dneWJheWpvb3FremJodnF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY2MTU3NDgsImV4cCI6MjA0MjE5MTc0OH0.lnOqnq1AwN41g4xJ5O9oNIPBQqXYJkSrRhJ3osXtcsk';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function insertData(data) {
    console.log('Insertion des données :', data);
    const { error } = await supabase
        .from('tableData1')
        .insert([data]);

    if (error) {
        console.error('Erreur lors de l\'insertion des données :', error);
    } else {
        console.log('Données insérées avec succès');
    }
}

export async function fetchData() {
    console.log('Envoi de la requête :', supabase
      .from('tableData1')
      .select('*')
      .toString());
  
    if (error) {
      console.error('Erreur lors de la récupération des données :', error);
      return [];
    }
  
    console.log('Données récupérées :', data);
    return data;
  }
