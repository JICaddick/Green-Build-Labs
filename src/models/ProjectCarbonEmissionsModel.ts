import { pool } from "../helpers/database"

class ProjectCarbonEmissions {
  // model for getting all project_carbon_emissions
  static async getAllProjectCarbonEmissions() {
    const sqlQuery = 'SELECT * FROM project_carbon_emissions';
    const rows = await pool.query(sqlQuery);
    return rows;
  }

  // model for getting project_carbon_emissions by id
  static async getProjectCarbonEmissionsById(id) {
    const sqlQuery = 'SELECT * FROM project_carbon_emissions WHERE id=?';
    const rows = await pool.query(sqlQuery, id);
    return rows;
  }

  // model for creating new project_carbon_emissions
  static async createProjectCarbonEmissions(project_id, total_carbon_emissions) {
      const sqlQuery = 'INSERT INTO project_carbon_emissions (project_id, total_carbon_emissions) VALUES (?, ?)';
      const result = await pool.query(sqlQuery, [project_id, total_carbon_emissions]);
      return result;
  }

  // model for updating project_carbon_emissions info
  static async updateProjectCarbonEmissions(id, project_id, total_carbon_emissions) {
    // check if project_carbon_emissions exists
    const checkQuery = 'SELECT id FROM project_carbon_emissions WHERE id=?';
    const checkResult = await pool.query(checkQuery, [id]);
    if (checkResult.length === 0) {
      throw new Error(`ProjectCarbonEmissions with id ${id} not found`);
    }
    // update project_carbon_emissions info in the database
    const updateQuery = 'UPDATE project_carbon_emissions SET project_id=?, total_carbon_emissions=? WHERE id=?';
    const updateResult = await pool.query(updateQuery, [project_id, total_carbon_emissions, id]);
    return updateResult;
  }

  // model for deleting project_carbon_emissions
  static async deleteProjectCarbonEmissions(id) {
    // check if project_carbon_emissions exists
    const checkQuery = 'SELECT id FROM project_carbon_emissions WHERE id=?';
    const checkResult = await pool.query(checkQuery, [id]);
    if (checkResult.length === 0) {
      throw new Error(`ProjectCarbonEmissions with id ${id} not found`);
    }
    // delete project_carbon_emissions from database
    const deleteQuery = 'DELETE FROM project_carbon_emissions WHERE id=?';
    const deleteResult = await pool.query(deleteQuery, [id]);
    return deleteResult;
  }
}

export default ProjectCarbonEmissions;