const express = require('express');
const { MongoClient } = require('mongodb');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

// MongoDB Connection
const client = new MongoClient(process.env.MONGO_URI);
const db = client.db(process.env.DB_NAME);
const orders = db.collection(process.env.COLLECTION);

// Add order
app.post('/orders', async (req, res) => {
    const { user_id, product_ids } = req.body;
    try {
        // Get user data
        const userResponse = await axios.get(`http://localhost:3001/users/${user_id}`);
        const user = userResponse.data;

        // Get product data
        const products = await Promise.all(
            product_ids.map((id) => axios.get(`http://localhost:3002/products/${id}`))
        );
        const total_price = products.reduce((sum, p) => sum + p.data.price, 0);

        const order = { user_id, product_ids, total_price, created_at: new Date() };
        const result = await orders.insertOne(order);

        res.status(201).json({ id: result.insertedId, ...order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get order by ID
app.get('/orders/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const order = await orders.findOne({ _id: new MongoClient.ObjectId(id) });
        if (order) res.json(order);
        else res.status(404).json({ error: 'Order not found' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3003, () => console.log('Order Service running on port 3003'));
