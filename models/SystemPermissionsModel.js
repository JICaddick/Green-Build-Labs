const pool = require('../helpers/database');

class SystemPermissions {
// model for checking if systemPermissions exists
  static async checkIfExists(id) {
    const sqlQuery = 'SELECT id FROM system_permissions WHERE id=?';
    const rows = await pool.query(sqlQuery, [id]);
    return rows.length > 0;
  }

// model for getting all systemPermissions
  static async getAllSystemPermissions() {
    const sqlQuery = 'SELECT * FROM system_permissions';
    const rows = await pool.query(sqlQuery);
    return rows;
  }

// model for getting systemPermissions by id
  static async getSystemPermissionsById(id) {
    const sqlQuery = 'SELECT * FROM system_permissions WHERE id=?';
    const rows = await pool.query(sqlQuery, id);
    return rows;
  }

// model for creating new systemPermissions
  static async createSystemPermissions(user_id, project_id) {
    const sqlQuery = 'INSERT INTO system_permissions (user_id, project_id) VALUES (?, ?)';
    const result = await pool.query(sqlQuery, [user_id, project_id]);
    return result;
  }

// model for updating systemPermissions
  static async updateSystemPermissions(id, updates) {
    let sqlQuery = 'UPDATE system_permissions SET ';
    let updateFields = [];
    let params = [];
    for (let field in updates) {
      updateFields.push(`${field} = ?`);
      params.push(updates[field]);
    }
    params.push(id);
    sqlQuery += updateFields.join(', ');
    sqlQuery += ' WHERE id = ?';
    const result = await pool.query(sqlQuery, params);
    return result;
  }


  // exports.updateSystemPermissionsById = async function(id, updates) {
  //   let sqlQuery = 'UPDATE system_permissions SET ';
  //   let updateFields = [];
  //   let params = [];
  //   for (let field in updates) {
  //     updateFields.push(`${field} = ?`);
  //     params.push(updates[field]);
  //   }
  //   params.push(id);
  //   sqlQuery += updateFields.join(', ');
  //   sqlQuery += ' WHERE id = ?';
  //   const result = await pool.query(sqlQuery, params);
  //   return result;
  // };

// model for deleting systemPermissions
  static async deleteSystemPermissions(id) {
    // check if systemPermissions exists
    const checkQuery = 'SELECT id FROM system_permissions WHERE id=?';
    const checkResult = await pool.query(checkQuery, [id]);
    if (checkResult.length === 0) {
      throw new Error(`SystemPermissions with id ${id} not found`);
    }
    // delete systemPermissions from database
    const deleteQuery = 'DELETE FROM system_permissions WHERE id=?';
    const deleteResult = await pool.query(deleteQuery, [id]);
    return deleteResult;
  }
}

module.exports = SystemPermissions;