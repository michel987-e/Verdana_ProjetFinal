const express = require('express');
const { getBotReply } = require('../services/chatbotService');

const router = express.Router();

router.post('/ask', (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Veuillez fournir une question.' });
  }

  const response = getBotReply(question);
  res.json({ reply: response });
});

module.exports = router;
