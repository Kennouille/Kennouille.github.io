//const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const supabaseUrl = 'https://mngggybayjooqkzbhvqy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uZ2dneWJheWpvb3FremJodnF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY2MTU3NDgsImV4cCI6MjA0MjE5MTc0OH0.lnOqnq1AwN41g4xJ5O9oNIPBQqXYJkSrRhJ3osXtcsk';
const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/events', async (req, res) => {
  const { data, error } = await supabase
    .from('events')
    .select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post('/events', async (req, res) => {
  const { date, event } = req.body;
  const { data, error } = await supabase
    .from('events')
    .insert([{ date, event }]);
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).send('Event added');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
