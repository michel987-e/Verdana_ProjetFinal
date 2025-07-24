const Flower = require('../models/flowerModel');

exports.getAllFlowers = async (req, res) => {
  try {
    const flowers = await Flower.getAllFlowers();
    res.json(flowers);
  } catch (err) {
    res.status(500).json({
      error: "Internal server error",
      service: "CONTROLLER",
      detail: err.message
    })
  }
};

exports.getFlowerById = async (req, res) => {
  try {
    const { id } = req.params;
    const flowers = await Flower.getFlowersById(id);

    res.json(flowers);
  } catch (err) {
    res.status(500).json({
      error: "Internal server error",
      service: "CONTROLLER",
      detail: err.message
    });
  }
};

exports.getFlowersByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const flowers = await Flower.getFlowersByUserId(user_id);
    res.json(flowers);
  } catch (err) {
    res.status(500).json({
      error: "Internal server error",
      service: "CONTROLLER",
      detail: err.message
    });
  }
};

exports.createFlower = async (req, res) => {
  try {
    const {
      user_id,
      name,
      plant_type,
      location,
      temp_min,
      temp_max,
      humidity_min,
      humidity_max,
      soil_min,
      soil_max,
      light_min,
      light_max
    } = req.body;

    if (!user_id) {
      return res.status(400).json({
        error: "user_id are required."
      });
    }

    const newFlower = await Flower.createFlower({
      user_id,
      name,
      plant_type,
      location,
      temp_min,
      temp_max,
      humidity_min,
      humidity_max,
      soil_min,
      soil_max,
      light_min,
      light_max
    });

    res.status(201).json(newFlower);
  } catch (err) {
    res.status(500).json({
      error: "Internal server error",
      service: "CONTROLLER",
      detail: err.message
    });
  }
};

exports.deleteFlower = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFlower = await Flower.deleteFlower(id);
    res.json({
      message: `Flower with id ${id} deleted successfully`,
      flower: deletedFlower
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal server error",
      service: "CONTROLLER",
      detail: err.message
    });
  }
};

exports.updateFlower = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      user_id,
      name,
      plant_type,
      location,
      temp_min,
      temp_max,
      humidity_min,
      humidity_max,
      soil_min,
      soil_max,
      light_min,
      light_max
    } = req.body;

    const updatedFlower = await Flower.updateFlower(id, {
      user_id,
      name,
      plant_type,
      location,
      temp_min,
      temp_max,
      humidity_min,
      humidity_max,
      soil_min,
      soil_max,
      light_min,
      light_max
    });

    res.json({
      message: `Flower with id ${id} updated successfully`,
      flower: updatedFlower
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal server error",
      service: "CONTROLLER",
      detail: err.message
    });
  }
};
