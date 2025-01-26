const express = require('express');
const { Firestore } = require('@google-cloud/firestore');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

// Firestore Connection
const firestore = new Firestore();

// Add notification
app.post('/notifications', async (req, res) => {
    const { user_id, message } = req.body;
    try {
        const docRef = await firestore.collection('notifications').add({
            user_id,
            message,
            created_at: new Date(),
        });

        res.status(201).json({ id: docRef.id, user_id, message });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get notification by ID
app.get('/notifications/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const doc = await firestore.collection('notifications').doc(id).get();
        if (doc.exists) res.json(doc.data());
        else res.status(404).json({ error: 'Notification not found' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3005, () => console.log('Notification Service running on port 3005'));
