const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const supabaseUrl = 'https://mngggybayjooqkzbhvqy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFheWpvb3FremJodnF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY2MTU3NDgsImV4cCI6MjA0MjE5MTc0OH0.lnOqnq1AwN41g4xJ5O9oNIPBQqXYJkSrRhJ3osXtcsk';
const supabase = createClient(supabaseUrl, supabaseKey);

// Récupération des événements
app.get('/event_quot', async (req, res) => {
  const { data, error } = await supabase
    .from('event_quot')
    .select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Ajout d'un nouvel événement
app.post('/event_quot', async (req, res) => {
  const { date, event } = req.body;
  const { data, error } = await supabase
    .from('event_quot')
    .insert([{ date, event }]);
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).send('Event added');
});

// Suppression de la facture associée à un événement
app.post('/delete-factura/:eventId', async (req, res) => {
  const eventId = req.params.eventId;

  try {
    // Utiliser Supabase pour mettre la colonne `factura` à NULL pour un événement spécifique
    const { data, error } = await supabase
      .from('event_quot1')
      .update({ factura: null }) // Mettre la colonne `factura` à NULL
      .eq('id', eventId);        // Trouver l'événement correspondant avec l'ID

    if (error) throw error;

    res.status(200).send({ message: "Factura borrada con éxito." });
  } catch (error) {
    console.error("Error al borrar la factura:", error);
    res.status(500).send({ message: "Error al borrar la factura." });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
