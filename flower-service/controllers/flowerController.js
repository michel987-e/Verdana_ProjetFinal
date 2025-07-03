const Flower = require('../models/flowerModel');

exports.getAllFlowers = async (req, res) => {
  try {
    const flowers = await Flower.getAllFlowers();
    res.json(flowers);
  } catch (err) {
    res.status(500).json({error: "Internal server error", service: "CONTROLLER", detail: err.message})
  }
};