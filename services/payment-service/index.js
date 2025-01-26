const express = require('express');
const { createClient } = require('redis');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

// Redis Connection
const redisClient = createClient({ url: process.env.REDIS_URL });
redisClient.connect();

// Add payment
app.post('/payments', async (req, res) => {
    const { order_id } = req.body;
    try {
        // Get order data
        const orderResponse = await axios.get(`http://localhost:3003/orders/${order_id}`);
        const order = orderResponse.data;

        const payment = { order_id, amount: order.total_price, status: 'completed' };
        await redisClient.set(`payment:${order_id}`, JSON.stringify(payment));

        res.status(201).json(payment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get payment by ID
app.get('/payments/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const payment = await redisClient.get(`payment:${id}`);
        if (payment) res.json(JSON.parse(payment));
        else res.status(404).json({ error: 'Payment not found' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3004, () => console.log('Payment Service running on port 3004'));
