var express = require('express');
var router = express.Router();
const pool = require('../helpers/database');

// CRUD routes for systemPermissions table
// GET route to get all systemPermissions.
router.get('/getsystempermissions', async function(req, res) {
  try {
    const sqlQuery = 'SELECT * FROM system_permissions';
    const rows = await pool.query(sqlQuery);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
});

// GET route to get a systemPermissions by id.
router.get('/:id/getsystempermissionsbyid', async function(req, res) {
  try {
    const sqlQuery = 'SELECT * FROM system_permissions WHERE id=?';
    const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
});

// POST route to create new systemPermissions.
router.post('/createsystempermissions', async function(req, res) {
  try {
    const {user_id, project_id} = req.body;

    const sqlQuery = 'INSERT INTO system_permissions (user_id, project_id) VALUES (?, ?)';
    const result = await pool.query(sqlQuery, [user_id, project_id]);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error.message)
  }
});

// PUT route to update a systemPermissions by id.
router.put('/:id/updatesystempermissions', async function(req, res) {
  try {
    const { id } = req.params;
    const { ...updates } = req.body; // Use spread operator to get all fields from req.body

    // Check if systemPermissions exists
    const checkQuery = 'SELECT id FROM system_permissions WHERE id = ?';
    const checkResult = await pool.query(checkQuery, [id]);
    if (checkResult.length === 0) {
      return res.status(404).send(`SystemPermissions with id ${id} not found`);
    }

    // Build dynamic update query
    let sqlQuery = 'UPDATE system_permissions SET ';
    let updateFields = [];
    for (let field in updates) {
      updateFields.push(`${field} = ?`);
    }
    sqlQuery += updateFields.join(', ');
    sqlQuery += ' WHERE id = ?';

    // Build parameters array for query
    let params = [];
    for (let field in updates) {
      params.push(updates[field]);
    }
    params.push(id);

    // Execute update query
    const result = await pool.query(sqlQuery, params);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// DELETE route to delete a systemPermissions by id.
router.delete('/:id/deletesystempermissions', async function(req, res) {
  try {
    const { id } = req.params;

    // Check if systemPermissions exists
    const checkQuery = 'SELECT id FROM system_permissions WHERE id = ?';
    const checkResult = await pool.query(checkQuery, [id]);
    if (checkResult.length === 0) {
      return res.status(404).send(`SystemPermissions with id ${id} not found`);
    }

    // Delete systemPermissions
    const sqlQuery = 'DELETE FROM system_permissions WHERE id = ?';
    const result = await pool.query(sqlQuery, [id]);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


module.exports = router;