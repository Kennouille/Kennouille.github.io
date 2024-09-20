// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/agenda', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Définir un modèle pour les événements
const eventSchema = new mongoose.Schema({
    fecha: String,
    hora: String,
    min: String,
    telefono: String,
    nombre: String,
    lugar: String,
    precio: String,
    trabajo: String,
    user_id: String
});

const Event = mongoose.model('Event', eventSchema);

// Routes
app.get('/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.send(events);
    } catch (err) {
        res.status(500).send({ message: 'Erreur lors de la récupération des événements', error: err });
    }
});

app.post('/events', async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.send(event);
    } catch (err) {
        res.status(500).send({ message: 'Erreur lors de l\'enregistrement de l\'événement', error: err });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
