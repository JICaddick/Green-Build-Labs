var express = require('express');
var router = express.Router();
const pool = require('../helpers/database');

//CRUD routes for materials table

//GET route to get all materials.
router.get('/getmaterials', async function(req, res) {
  try {
    const sqlQuery = 'SELECT * FROM materials';
    const rows = await pool.query(sqlQuery);
    res.status(200).json(rows);
  }
  catch (error) {
    res.status(400).send(error.message)
  }
});

//GET route to get a single material.
router.get('/:id/getmaterial', async function(req, res) {
  try {
    const sqlQuery = 'SELECT * FROM materials WHERE id = ?';
    const rows = await pool.query(sqlQuery, [req.params.id]);
    res.status(200).json(rows);
  }
  catch (error) {
    res.status(400).send(error.message)
  }
});

//POST route to add a new material.
router.post('/addmaterial', async function(req, res) {
  try {
    const sqlQuery = 'INSERT INTO materials (name, unit, carbon_emissions_per_unit) VALUES (?, ?, ?)';
    const result = await pool.query(sqlQuery, [req.body.name, req.body.unit, req.body.carbon_emissions_per_unit]);
    res.status(200).json(result);
  }
  catch (error) {
    res.status(400).send(error.message)
  }
});

//PUT route to update a material.
router.put('/:id/updatematerial', async function(req, res) {
  try {
    const sqlQuery = 'UPDATE materials SET name = ?, unit = ?, carbon_emissions_per_unit = ? WHERE id = ?';
    const result = await pool.query(sqlQuery, [req.body.name, req.body.unit, req.body.carbon_emissions_per_unit, req.params.id]);
    res.status(200).json(result);
  }
  catch (error) {
    res.status(400).send(error.message)
  }
});

// DELETE route to delete material
router.delete('/:id/deletematerial', async function(req, res) {
  try {
    const {id} = req.params;

    // check if project exists
    const checkQuery = 'SELECT id FROM materials WHERE id=?';
    const checkResult = await pool.query(checkQuery, [id]);
    if (checkResult.length === 0) {
      return res.status(404).send(`Material with id ${id} not found`);
    }

    const sqlQuery = 'DELETE FROM materials WHERE id=?';
    const result = await pool.query(sqlQuery, [id]);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error.message)
  }
});


module.exports = router;