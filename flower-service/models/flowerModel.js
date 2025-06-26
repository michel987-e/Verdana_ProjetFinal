const pool = require('../config/db');

exports.getAllFlowers = async () => {
  try {
    const result = await pool.query('SELECT * FROM flowers');
    return result.rows;
  } catch (err) {
    throw new Error(`[MODEL] ${err.message}`);
  }
};

exports.createFlower = async () => {
  try {

  } catch (err) {

  }
}