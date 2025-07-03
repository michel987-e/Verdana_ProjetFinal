const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const flowerRoutes = require('./routes/flowerRoutes');
const authMiddleware = require('./middlewares/authMiddleware')

const app = express();
app.use(cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(cookieParser());
app.use(authMiddleware);
app.use('/flower', flowerRoutes); // Prefix route

module.exports = app;