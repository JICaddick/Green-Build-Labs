import { pool } from "../helpers/database"

class Project {

// model for getting all projects
  static async getAllProjects() {
    const sqlQuery = 'SELECT * FROM project';
    const rows = await pool.query(sqlQuery);
    return rows;
  }

// model for getting project by id
  static async getProjectById(id) {
    const sqlQuery = 'SELECT * FROM project WHERE id=?';
    const rows = await pool.query(sqlQuery, id);
    return rows;
  }

// model for creating new project
  static async createProject(name, start_date, end_date, user_id) {
    const sqlQuery = 'INSERT INTO project (name, start_date, end_date, user_id) VALUES (?, ?, ?, ?)';
    const result = await pool.query(sqlQuery, [name, start_date, end_date, user_id]);
    return result;
  }

// model for updating project info
  static async updateProject(id, name, start_date, end_date, user_id) {
    // check if project exists
    const checkQuery = 'SELECT id FROM project WHERE id=?';
    const checkResult = await pool.query(checkQuery, [id]);
    if (checkResult.length === 0) {
      throw new Error(`Project with id ${id} not found`);
    }
    // update project info in the database
    const updateQuery = 'UPDATE project SET name=?, start_date=?, end_date=?, user_id=? WHERE id=?';
    const updateResult = await pool.query(updateQuery, [name, start_date, end_date, user_id, id]);
    return updateResult;
  }

// model for deleting project
  static async deleteProject(id) {
    // check if project exists
    const checkQuery = 'SELECT id FROM project WHERE id=?';
    const checkResult = await pool.query(checkQuery, [id]);
    if (checkResult.length === 0) {
      throw new Error(`Project with id ${id} not found`);
    }
    // delete project from database
    const deleteQuery = 'DELETE FROM project WHERE id=?';
    const deleteResult = await pool.query(deleteQuery, [id]);
    return deleteResult;
  }
}

module.exports = Project;