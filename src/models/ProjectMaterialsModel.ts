import { pool } from "../helpers/database"

class ProjectMaterials {

// model for getting all project_materials
  static async getAllProjectMaterials() {
    const sqlQuery = 'SELECT * FROM project_materials';
    const rows = await pool.query(sqlQuery);
    return rows;
  }

// model for getting project_materials by id
  static async getProjectMaterialsById(id) {
    const sqlQuery = 'SELECT * FROM project_materials WHERE id=?';
    const rows = await pool.query(sqlQuery, id);
    return rows;
  }

// model for creating new project_materials
  static async createProjectMaterials(project_id, material_id, quantity) {
    // check if project exists
    const checkQuery = 'SELECT id FROM project WHERE id=?';
    const checkResult = await pool.query(checkQuery, [project_id]);
    if (checkResult.length === 0) {
      throw new Error(`Project with id ${project_id} not found`);
    }
    // check if material exists
    const checkQuery2 = 'SELECT id FROM materials WHERE id=?';
    const checkResult2 = await pool.query(checkQuery2, [material_id]);

    if (checkResult2.length === 0) {
      throw new Error(`Material with id ${material_id} not found`);
    }
    // create project_materials in the database
    const sqlQuery = 'INSERT INTO project_materials (project_id, material_id, quantity) VALUES (?, ?, ?)';
    const result = await pool.query(sqlQuery, [project_id, material_id, quantity]);
    return result;
  }

// model for updating project_materials
  static async updateProjectMaterials(id, project_id, material_id, quantity) {
    // check if project_materials exists
    const checkQuery = 'SELECT id FROM project_materials WHERE id=?';
    const checkResult = await pool.query(checkQuery, [id]);
    if (checkResult.length === 0) {
      throw new Error(`ProjectMaterials with id ${id} not found`);
    }
    // update project_materials in the database
    const updateQuery = 'UPDATE project_materials SET project_id=?, material_id=?, quantity=? WHERE id=?';
    const updateResult = await pool.query(updateQuery, [project_id, material_id, quantity, id]);
    return updateResult;
  }

// model for deleting project_materials
  static async deleteProjectMaterials(id) {
    // check if project_materials exists
    const checkQuery = 'SELECT id FROM project_materials WHERE id=?';
    const checkResult = await pool.query(checkQuery, [id]);
    if (checkResult.length === 0) {
      throw new Error(`ProjectMaterials with id ${id} not found`);
    }
    // delete project_materials from the database
    const deleteQuery = 'DELETE FROM project_materials WHERE id=?';
    const deleteResult = await pool.query(deleteQuery, [id]);
    return deleteResult;
  }
}

module.exports = ProjectMaterials;