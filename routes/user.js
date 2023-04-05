var express = require('express');
var router = express.Router();
const pool = require('../helpers/database');

/* GET users listing. */
router.get('/:id', async function(req, res) {
  try { 
    const sqlQuery = 'SELECT id, email, password, created_at FROM user WHERE id=?';
    const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
});


router.post('/register', async function(req, res, next) {
  try {
    const {email, password} = req.body;

    const sqlQuery = 'INSERT INTO user (email, password) VALUES (?, ?)';
    const result = await pool.query(sqlQuery, [email, password]);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error.message)
  }
});


module.exports = router;


// could have users get, update, delete etc. Then you could have materials.js.