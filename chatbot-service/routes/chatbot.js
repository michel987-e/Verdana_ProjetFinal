const express = require('express');
const { getBotReply } = require('../services/chatbotService');
const { findFlowerInfo } = require('../services/flowerDataService');

const router = express.Router();

router.post('/ask', (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Veuillez fournir une question.' });
  }

  const knownPlants = ['ficus', 'cactus'];
  const detectedPlant = knownPlants.find(p => question.toLowerCase().includes(p));

  const plantInfo = detectedPlant ? findFlowerInfo(detectedPlant) : null;

  const reply = getBotReply(question, plantInfo);

  res.json({ reply });
});

module.exports = router;
