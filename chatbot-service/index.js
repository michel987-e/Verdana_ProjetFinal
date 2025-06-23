const express = require('express');
const chatbotRouter = require('./routes/chatbot');

const app = express();
const port = 80;

app.use(express.json());
app.use('/chatbot', chatbotRouter);

app.get('/', (req, res) => {
  res.send('Bienvenue sur le microservice chatbot de Verdana !');
});

app.listen(port, () => {
  console.log(`Chatbot microservice en écoute sur http://localhost:${port}`);
});
