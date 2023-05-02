const pool = require('../helpers/database');
const bcrypt = require('bcrypt');

class User {
// model for getting all users
  static async getAllUsers() {
    const sqlQuery = 'SELECT id, email, password, created_at, role FROM users';
    const rows = await pool.query(sqlQuery);
    return rows;
  }
// model for getting user by id
  static async getUserById(id) {
    const sqlQuery = 'SELECT id, email, password, created_at, role FROM users WHERE id=?';
    const rows = await pool.query(sqlQuery, id);
    return rows;
  }
// model for user registration
  static async createUser(email, password, role) {
    const encryptedPassword = await bcrypt.hash(password,10)
    const sqlQuery = 'INSERT INTO users (email, password, role) VALUES (?, ?, ?)';
    const result = await pool.query(sqlQuery, [email, encryptedPassword, role]);
    return result;
  }
// model for updating user info
  static async updateUser(id, email, password, role) {
    // check if user exists
    const checkQuery = 'SELECT id FROM users WHERE id=?';
    const checkResult = await pool.query(checkQuery, [id]);
    if (checkResult.length === 0) {
      throw new Error(`User with id ${id} not found`);
    }
    // hash new password
    const encryptedPassword = await bcrypt.hash(password,10);
    // update user info in the database
    // why is updateResult not used?
    const updateQuery = 'UPDATE users SET email=?, password=?, role=? WHERE id=?';
    const updateResult = await pool.query(updateQuery, [email, encryptedPassword, role, id]);
    return updateResult;
  }
// model for deleting user
  static async deleteUser(id) {
    // check if user exists
    const checkQuery = 'SELECT id FROM users WHERE id=?';
    const checkResult = await pool.query(checkQuery, [id]);
    if (checkResult.length === 0) {
      throw new Error(`User with id ${id} not found`);
    }
    // delete user from database
    const deleteQuery = 'DELETE FROM users WHERE id=?';
    const deleteResult = await pool.query(deleteQuery, [id]);
    return deleteResult;
  }
}

module.exports = User;