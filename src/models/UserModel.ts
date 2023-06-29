import { pool } from "../helpers/database"
import bcrypt from "bcrypt"
// This file defines the model which is used to interact with it's respective table in the database. It contains static methods for accessing the project table in the database
class User {

// model for getting all users
  static async getAllUsers() {
    const sqlQuery = 'SELECT * FROM users';
    const rows = await pool.query(sqlQuery);
    return rows;
  }

// model for getting user by id
  static async getUserById(id) {
    const sqlQuery = 'SELECT id, email, password, created_at, role FROM users WHERE id=?';
    const rows = await pool.query(sqlQuery, id);
    if (rows.length === 0) {
      throw new Error(`User with id ${id} not found`);
    }
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

export default User;