var express = require('express');
var router = express.Router();
const userController = require('../controllers/UserController');
const { authenticateUser } = require('../helpers/authMiddleware')
// This file defines CRUD routes using the Express router. Each route is linked to corresponding controllers. The URL is defined in the first argument, and the controller function is defined in the second argument. Routes give the a browser a way to access the functions in the controller.

// CRUD routes for user table

//GET route to get all users.(scoped to the authenticated user) - This is not currently useful, it will become useful when 'contractors' can add contractor_team users.
router.get('/getallusers', authenticateUser, userController.getAllUsers); 

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
//     try {
//         const { id, password } = req.body;
//         const sqlGetUser = 'SELECT id, email, password, created_at, role FROM users WHERE id=?';
//         const rows = await pool.query(sqlGetUser, id);

//         if (rows.length > 0) {
//             const isValid = await bcrypt.compare(password, rows[0].password);

//             if (isValid) {
//             res.status(200).json({ valid_password: true });
//             } else {
//             res.status(401).json({ valid_password: false });
//             }
//         } else {
//             res.status(404).send(`User with id ${id} was not found`);
//         }
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// });