const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const chatbotRouter = require('./routes/chatbot');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();
app.use(cors({
    origin: "http://localhost:3001",
    methods: ["POST"]
}))
app.use(express.json());
app.use(cookieParser());
app.use(authMiddleware);
app.use('/chatbot', chatbotRouter);

module.exports = app;
