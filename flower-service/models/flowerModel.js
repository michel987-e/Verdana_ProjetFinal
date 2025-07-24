const pool = require('../config/db');

exports.getAllFlowers = async () => {
  try {
    const result = await pool.query('SELECT * FROM flowers');
    return result.rows;
  } catch (err) {
    throw new Error(`[MODEL] ${err.message}`);
  }
};

exports.getFlowersByUserId = async (user_id) => {
  try {
    const result = await pool.query(
      'SELECT * FROM flowers WHERE user_id = $1',
      [user_id]
    );
    return result.rows;
  } catch (err) {
    throw new Error(`[MODEL] ${err.message}`);
  }
};

exports.getFlowersById = async (id) => {
  try {
    const result = await pool.query(
      'SELECT * FROM flowers WHERE id = $1',
      [id]
    );
    if (result.rowCount === 0) {
      throw new Error(`No flower found with id ${id}`);
    }
    return result.rows[0];
  } catch (err) {
    throw new Error(`[MODEL] ${err.message}`);
  }
};

exports.createFlower = async (flowerData) => {
  try {
    const query = `
      INSERT INTO flowers (
        user_id, name, plant_type, location,
        temp_min, temp_max,
        humidity_min, humidity_max,
        soil_min, soil_max,
        light_min, light_max
      )
      VALUES (
        $1, $2, $3, $4,
        $5, $6,
        $7, $8,
        $9, $10,
        $11, $12
      )
      RETURNING *;
    `;

    const values = [
      flowerData.user_id,
      flowerData.name,
      flowerData.plant_type,
      flowerData.location,
      flowerData.temp_min,
      flowerData.temp_max,
      flowerData.humidity_min,
      flowerData.humidity_max,
      flowerData.soil_min,
      flowerData.soil_max,
      flowerData.light_min,
      flowerData.light_max
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw new Error(`[MODEL] ${err.message}`);
  }
};


exports.deleteFlower = async (id) => {
  try {
    const result = await pool.query('DELETE FROM flowers WHERE id = $1 RETURNING *;', [id]);
    if (result.rowCount === 0) {
      throw new Error(`No flower found with id ${id}`);
    }
    return result.rows[0];
  } catch (err) {
    throw new Error(`[MODEL] ${err.message}`);
  }
};

exports.updateFlower = async (id, flowerData) => {
  try {
    const query = `
      UPDATE flowers SET
        user_id = $1,
        name = $2,
        plant_type = $3,
        location = $4,
        temp_min = $5,
        temp_max = $6,
        humidity_min = $7,
        humidity_max = $8,
        soil_min = $9,
        soil_max = $10,
        light_min = $11,
        light_max = $12,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $13
      RETURNING *;
    `;

    const values = [
      flowerData.user_id,
      flowerData.name,
      flowerData.plant_type,
      flowerData.location,
      flowerData.temp_min,
      flowerData.temp_max,
      flowerData.humidity_min,
      flowerData.humidity_max,
      flowerData.soil_min,
      flowerData.soil_max,
      flowerData.light_min,
      flowerData.light_max,
      id
    ];

    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
      throw new Error(`No flower found with id ${id}`);
    }
    return result.rows[0];
  } catch (err) {
    throw new Error(`[MODEL] ${err.message}`);
  }
};
