var express = require('express');
var router = express.Router();
const pool = require('../helpers/database');

// CRUD routes for project_materials table
// GET route to get all project_materials.
router.get('/getprojectmaterials', async function(req, res) {
  try {
    const sqlQuery = 'SELECT * FROM project_materials';
    const rows = await pool.query(sqlQuery);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
});

// GET route to get a project_materials by id.
router.get('/:id/getprojectmaterialsbyid', async function(req, res) {
  try {
    const sqlQuery = 'SELECT * FROM project_materials WHERE id=?';
    const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
});


// POST route to create new project_materials.
router.post('/createprojectmaterials', async function(req, res) {
  try {
    const {project_id, material_id, quantity} = req.body;

    const sqlQuery = 'INSERT INTO project_materials (project_id, material_id, quantity) VALUES (?, ?, ?)';
    const result = await pool.query(sqlQuery, [project_id, material_id, quantity]);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error.message)
  }
});

// PUT route to update project_materials info
router.put('/:id/updateprojectmaterials', async function(req, res) {
  try {
    const {project_id, material_id, quantity} = req.body;

    const sqlQuery = 'UPDATE project_materials SET project_id=?, material_id=?, quantity=? WHERE id=?';
    const result = await pool.query(sqlQuery, [project_id, material_id, quantity, req.params.id]);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error.message)
  }
});

// DELETE route to delete project_materials by id.
router.delete('/:id/deleteprojectmaterials', async function(req, res) {
  try {
    const sqlQuery = 'DELETE FROM project_materials WHERE id=?';
    const result = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error.message)
  }
});

module.exports = router;