const express = require('express');
const cors = require('cors');
const flowerRoutes = require('./routes/flowerRoutes');

const app = express();

app.use(cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use('/flower', flowerRoutes); // Prefix route

module.exports = app;