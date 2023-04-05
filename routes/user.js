var express = require('express');
var router = express.Router();
const pool = require('../helpers/database');
const bcrypt = require('bcrypt');

//GET route to get all users.
router.get('/getusers', async function(req, res) {
  try { 
    const sqlQuery = 'SELECT id, email, password, created_at FROM user';
    const rows = await pool.query(sqlQuery);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
});

// GET route to get a user by id.
router.get('/:id', async function(req, res) {
  try { 
    const sqlQuery = 'SELECT id, email, password, created_at FROM user WHERE id=?';
    const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
});


// POST route to create new user
router.post('/register', async function(req, res) {
  try {
    const {email, password} = req.body;

    const encryptedPassword = await bcrypt.hash(password,10)
    
    const sqlQuery = 'INSERT INTO user (email, password) VALUES (?, ?)';
    const result = await pool.query(sqlQuery, [email, encryptedPassword]);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error.message)
  }
});

// PUT route to update user info
router.put('/:id/updateuser', async function(req, res) {
  try {
    const {email, password} = req.body;
    const {id} = req.params;

    // check if user exists
    const checkQuery = 'SELECT id FROM user WHERE id=?';
    const checkResult = await pool.query(checkQuery, [id]);
    if (checkResult.length === 0) {
      return res.status(404).send(`User with id ${id} not found`);
    }

    // hash new password
    const encryptedPassword = await bcrypt.hash(password,10);

    // update user info in the database
    const updateQuery = 'UPDATE user SET email=?, password=? WHERE id=?';
    const updateResult = await pool.query(updateQuery, [email, encryptedPassword, id]);
    res.status(200).send(`User with id ${id} successfully updated`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete('/:id', async function(req, res) {
  try {
    const { id } = req.params;

    // check if user exists
    const checkQuery = 'SELECT id FROM user WHERE id=?';
    const checkResult = await pool.query(checkQuery, [id]);
    if (checkResult.length === 0) {
      return res.status(404).send(`User with id ${id} not found`);
    }

    // delete user from database
    const deleteQuery = 'DELETE FROM user WHERE id=?';
    await pool.query(deleteQuery, [id]);
    res.status(200).send(`User with id ${id} successfully deleted`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});



// internally handled authentication
// router.post('/login', async function(req,res) {
//   try {
//       const {id,password} = req.body;

//       const sqlGetUser = 'SELECT password FROM user WHERE id=?';
//       const rows = await pool.query(sqlGetUser,id);
//       if(rows){
          
//           const isValid = await bcrypt.compare(password,rows[0].password)
//           res.status(200).json({valid_password: isValid});
//       }
//       res.status(200).send(`User with id ${id} was not found`);
      
//   } catch (error) {
//       res.status(400).send(error.message)
//   }
// })

module.exports = router;


// could have users get, update, delete etc. Then you could have materials.js.