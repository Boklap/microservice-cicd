const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
app.use(express.json());

// MySQL Connection
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

app.get('/api/check', async (req, res ) => {
    console.log('hee hee hee haw')
    return res.status(200).json({ message: 'okay'})
})

// Add user
app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    try {
        const [result] = await db.execute('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
        res.status(201).json({ id: result.insertId, name, email });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get user by ID
app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
        if (rows.length > 0) res.json(rows[0]);
        else res.status(404).json({ error: 'User not found' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(process.env.BACKEND_PORT, () => console.log('User Service running on port 3001'));
