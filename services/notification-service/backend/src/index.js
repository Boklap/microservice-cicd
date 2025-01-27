const express = require('express');
const { getFirestore, collection, addDoc, getDocs, query, where, Timestamp } = require('firebase/firestore/lite');
const { initializeApp } = require('firebase/app');
require('dotenv').config();

const app = express();
app.use(express.json());

const firebaseConfig = {
    apiKey: "AIzaSyB8Zyr0l80dExVV0fl1iCYN3-1iqnVY0Dc",
    authDomain: "microservice-ci-cd.firebaseapp.com",
    projectId: "microservice-ci-cd",
    storageBucket: "microservice-ci-cd.firebasestorage.app",
    messagingSenderId: "158367224073",
    appId: "1:158367224073:web:82c2329638d11db06203d8",
    measurementId: "G-VV6ZHFL43Z",
};

// Firestore Connection
const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);

app.get('/api/check', async (req, res) => {
    return res.status(200).json({ message: "ok" });
});

// Add notification
app.post('/notifications', async (req, res) => {
    const { user_id, message } = req.body;

    try {
        const bokmanCol = collection(db, 'bokman');
        const newNotification = {
            user_id,
            message,
            createdAt: Timestamp.fromDate(new Date()),
            id: Math.random().toString(36).substr(2, 9),
        };

        const docRef = await addDoc(bokmanCol, newNotification);

        return res.status(201).json({
            id: docRef.id,
            ...newNotification,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
});

// Get notification by ID
app.get('/notifications/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const bokmanCol = collection(db, 'bokman');
        const q = query(bokmanCol, where('id', '==', id));
        const bokmanSnapshot = await getDocs(q);

        if (bokmanSnapshot.empty) {
            return res.status(404).json({ error: 'Notification not found' });
        }

        const notificationList = bokmanSnapshot.docs.map((doc) => doc.data());
        return res.status(200).json(notificationList);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
});

app.listen(3005, () => console.log('Notification Service running on port 3005'));
