var express = require('express');
var router = express.Router();
const pool = require('../helpers/database');

// CRUD routes for project_carbon_emissions table
// GET route to get all project_carbon_emissions.
router.get('/getprojectcarbonemissions', async function(req, res) {

  try {
    const sqlQuery = 'SELECT * FROM project_carbon_emissions';
    const rows = await pool.query(sqlQuery);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
}
);

// GET route to get a project_carbon_emissions by id.
router.get('/:id/getprojectcarbonemissionsbyid', async function(req, res) {

  try {
    const sqlQuery = 'SELECT * FROM project_carbon_emissions WHERE id=?';
    const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
}
);


// POST route to create new project_carbon_emissions.
router.post('/createprojectcarbonemissions', async function(req, res) {

  try {
    const {project_id, total_carbon_emissions} = req.body;

    const sqlQuery = 'INSERT INTO project_carbon_emissions (project_id, total_carbon_emissions) VALUES (?, ?)';
    const result = await pool.query(sqlQuery, [project_id, total_carbon_emissions]);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error.message)
  }
}
);

// PUT route to update project_carbon_emissions info
router.put('/:id/updateprojectcarbonemissions', async function(req, res) {

  try {
    const {project_id, total_carbon_emissions} = req.body;

    const sqlQuery = 'UPDATE project_carbon_emissions SET project_id=?, total_carbon_emissions=? WHERE id=?';
    const result = await pool.query(sqlQuery, [project_id, total_carbon_emissions, req.params.id]);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error.message)
  }
}
);

// DELETE route to delete project_carbon_emissions by id.
router.delete('/:id/deleteprojectcarbonemissions', async function(req, res) {

  try {
    const sqlQuery = 'DELETE FROM project_carbon_emissions WHERE id=?';
    const result = await pool.query(sqlQuery, req.params.id);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error.message)
  }
}
);

module.exports = router;