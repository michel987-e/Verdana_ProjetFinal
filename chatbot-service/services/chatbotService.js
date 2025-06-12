function getBotReply(question) {
  const q = question.toLowerCase();

  if (q.includes('arroser') || q.includes('eau')) {
    return "La plupart des plantes d'intérieur aiment être arrosées une fois par semaine.";
  }

  if (q.includes('lumière') || q.includes('soleil')) {
    return "Place ta plante près d'une fenêtre, mais évite la lumière directe du soleil.";
  }

  if (q.includes('engrais') || q.includes('nourrir')) {
    return "Utilise de l'engrais une fois par mois au printemps et en été.";
  }

  return "Désolé, je n'ai pas bien compris la question.";
}

module.exports = { getBotReply };
