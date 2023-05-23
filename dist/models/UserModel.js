"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../helpers/database");
const bcrypt_1 = __importDefault(require("bcrypt"));
// This file defines the model which is used to interact with it's respective table in the database. It contains static methods for accessing the project table in the database
class User {
    // model for getting all users
    static getAllUsers(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = 'SELECT id, email, password, created_at, role FROM users WHERE id=?';
            const rows = yield database_1.pool.query(sqlQuery, [id]);
            return rows;
        });
    }
    // model for getting user by id
    static getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = 'SELECT id, email, password, created_at, role FROM users WHERE id=?';
            const rows = yield database_1.pool.query(sqlQuery, id);
            return rows;
        });
    }
    // model for user registration
    static createUser(email, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const encryptedPassword = yield bcrypt_1.default.hash(password, 10);
            const sqlQuery = 'INSERT INTO users (email, password, role) VALUES (?, ?, ?)';
            const result = yield database_1.pool.query(sqlQuery, [email, encryptedPassword, role]);
            return result;
        });
    }
    // model for updating user info
    static updateUser(id, email, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            // check if user exists
            const checkQuery = 'SELECT id FROM users WHERE id=?';
            const checkResult = yield database_1.pool.query(checkQuery, [id]);
            if (checkResult.length === 0) {
                throw new Error(`User with id ${id} not found`);
            }
            // hash new password
            const encryptedPassword = yield bcrypt_1.default.hash(password, 10);
            // update user info in the database
            const updateQuery = 'UPDATE users SET email=?, password=?, role=? WHERE id=?';
            const updateResult = yield database_1.pool.query(updateQuery, [email, encryptedPassword, role, id]);
            return updateResult;
        });
    }
    // model for deleting user
    static deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // check if user exists
            const checkQuery = 'SELECT id FROM users WHERE id=?';
            const checkResult = yield database_1.pool.query(checkQuery, [id]);
            if (checkResult.length === 0) {
                throw new Error(`User with id ${id} not found`);
            }
            // delete user from database
            const deleteQuery = 'DELETE FROM users WHERE id=?';
            const deleteResult = yield database_1.pool.query(deleteQuery, [id]);
            return deleteResult;
        });
    }
}
module.exports = User;
