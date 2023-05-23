const pool = require('../helpers/database');

class Material {

// model for getting all materials
  static async getAllMaterials() {
    const sqlQuery = 'SELECT * FROM materials';
    const rows = await pool.query(sqlQuery);
    return rows;
  }

// model for getting material by id
  static async getMaterial(id) {
    const sqlQuery = 'SELECT * FROM materials WHERE id=?';
    const rows = await pool.query(sqlQuery, id);
    return rows;
  }

// model for adding new material
  static async addMaterial(name, unit, carbon_emissions_per_unit) {
    const sqlQuery = 'INSERT INTO materials (name, unit, carbon_emissions_per_unit) VALUES (?, ?, ?)';
    const result = await pool.query(sqlQuery, [name, unit, carbon_emissions_per_unit]);
    return result;
  }

// model for updating material info
  static async updateMaterial(id, name, unit, carbon_emissions_per_unit) {
    // check if material exists
    const checkQuery = 'SELECT id FROM materials WHERE id=?';
    const checkResult = await pool.query(checkQuery, [id]);
    if (checkResult.length === 0) {
      throw new Error(`Material with id ${id} not found`);
    }
    // update material info in the database
    const updateQuery = 'UPDATE materials SET name=?, unit=?, carbon_emissions_per_unit=? WHERE id=?';
    const updateResult = await pool.query(updateQuery, [name, unit, carbon_emissions_per_unit, id]);
    return updateResult;
  }

// model for deleting material
  static async deleteMaterial(id) {
    // check if material exists
    const checkQuery = 'SELECT id FROM materials WHERE id=?';
    const checkResult = await pool.query(checkQuery, [id]);
    if (checkResult.length === 0) {
      throw new Error(`Material with id ${id} not found`);
    }
    // delete material from database
    const deleteQuery = 'DELETE FROM materials WHERE id=?';
    const deleteResult = await pool.query(deleteQuery, [id]);
    return deleteResult;
  }
}

module.exports = Material;