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
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../helpers/database");
class SystemPermissions {
    // model for checking if systemPermissions exists
    static checkIfExists(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = 'SELECT id FROM system_permissions WHERE id=?';
            const rows = yield database_1.pool.query(sqlQuery, [id]);
            return rows.length > 0;
        });
    }
    // model for getting all systemPermissions
    static getAllSystemPermissions() {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = 'SELECT * FROM system_permissions';
            const rows = yield database_1.pool.query(sqlQuery);
            return rows;
        });
    }
    // model for getting systemPermissions by id
    static getSystemPermissionsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = 'SELECT * FROM system_permissions WHERE id=?';
            const rows = yield database_1.pool.query(sqlQuery, id);
            return rows;
        });
    }
    // model for creating new systemPermissions
    static createSystemPermissions(user_id, project_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = 'INSERT INTO system_permissions (user_id, project_id) VALUES (?, ?)';
            const result = yield database_1.pool.query(sqlQuery, [user_id, project_id]);
            return result;
        });
    }
    // model for updating systemPermissions
    static updateSystemPermissions(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            let sqlQuery = 'UPDATE system_permissions SET ';
            let updateFields = [];
            let params = [];
            // check if system_permissions record exists
            const checkQuery = 'SELECT id FROM system_permissions WHERE id=?';
            const checkResult = yield database_1.pool.query(checkQuery, [id]);
            if (checkResult.length === 0) {
                throw new Error(`Project with id ${id} not found`);
            }
            for (let field in updates) {
                updateFields.push(`${field} = ?`);
                params.push(updates[field]);
            }
            params.push(id);
            sqlQuery += updateFields.join(', ');
            sqlQuery += ' WHERE id = ?';
            const result = yield database_1.pool.query(sqlQuery, params);
            return result;
        });
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
    static deleteSystemPermissions(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // check if systemPermissions exists
            const checkQuery = 'SELECT id FROM system_permissions WHERE id=?';
            const checkResult = yield database_1.pool.query(checkQuery, [id]);
            if (checkResult.length === 0) {
                throw new Error(`SystemPermissions with id ${id} not found`);
            }
            // delete systemPermissions from database
            const deleteQuery = 'DELETE FROM system_permissions WHERE id=?';
            const deleteResult = yield database_1.pool.query(deleteQuery, [id]);
            return deleteResult;
        });
    }
}
module.exports = SystemPermissions;
