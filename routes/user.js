var express = require('express');
var router = express.Router();
const userController = require('../controllers/UserController');

// CRUD routes for project table
//GET route to get all users.
router.get('/getallusers', userController.getAllUsers); 

// GET route to get a user by id.
router.get('/:id/getuserbyid', userController.getUserById);

// POST route to create new user
router.post('/register', userController.createUser);

// PUT route to update user info
router.put('/:id/updateuser', userController.updateUser);

// DELETE route to delete user
router.delete('/:id/deleteuser', userController.deleteUser);

module.exports = router;

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