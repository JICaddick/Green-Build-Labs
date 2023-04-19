var express = require('express');
var router = express.Router();
const pool = require('../helpers/database');

// CRUD routes for project table
// GET route to get all projects.
router.get('/getprojects', async function(req, res) {
  try { 
    const sqlQuery = 'SELECT * FROM project';
    const rows = await pool.query(sqlQuery);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
});

// GET route to get a project by id.
router.get('/:id/getprojectbyid', async function(req, res) {
  try { 
    const sqlQuery = 'SELECT * FROM project WHERE id=?';
    const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
});

// POST route to create new project ADD created_by to table in database.
// Add a clause here to check if the user exists.*****
router.post('/createproject', async function(req, res) {
  try {
    const {name, start_date, end_date} = req.body;

    // check if user exists
    // const checkQuery = 'SELECT id FROM users WHERE id=?';
    // const checkResult = await pool.query(checkQuery, [id]);
    // if (checkResult.length === 0) {
    //   return res.status(404).send(`Sign up to create project`);
    // }
    
    const sqlQuery = 'INSERT INTO project (name, start_date, end_date) VALUES (?, ?, ?)';
    const result = await pool.query(sqlQuery, [name, start_date, end_date]);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error.message)
  }
});

// PUT route to update project info
router.put('/:id/updateproject', async function(req, res) {
  try {
    const {name, start_date, end_date} = req.body;
    const {id} = req.params;

    // check if project exists
    const checkQuery = 'SELECT id FROM project WHERE id=?';
    const checkResult = await pool.query(checkQuery, [id]);
    if (checkResult.length === 0) {
      return res.status(404).send(`Project with id ${id} not found`);
    }

    const sqlQuery = 'UPDATE project SET name=?, start_date=?, end_date=? WHERE id=?';
    const result = await pool.query(sqlQuery, [name, start_date, end_date, id]);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error.message)
  }
});

// DELETE route to delete project
router.delete('/:id/deleteproject', async function(req, res) {
  try {
    const {id} = req.params;

    // check if project exists
    const checkQuery = 'SELECT id FROM project WHERE id=?';
    const checkResult = await pool.query(checkQuery, [id]);
    if (checkResult.length === 0) {
      return res.status(404).send(`Project with id ${id} not found`);
    }

    const sqlQuery = 'DELETE FROM project WHERE id=?';
    const result = await pool.query(sqlQuery, [id]);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error.message)
  }
});

module.exports = router;