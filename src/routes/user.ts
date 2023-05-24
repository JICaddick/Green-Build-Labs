import express, { Router } from 'express';
import * as userController from '../controllers/UserController';
import { authenticateUser } from '../helpers/authMiddleware';

// This file defines CRUD routes using the Express router. Each route is linked to corresponding controllers.
// The URL is defined in the first argument, and the controller function is defined in the second argument.
// Routes provide a way for the browser to access the functions in the controller.

const router: Router = express.Router();

// CRUD routes for user table

// GET route to get all users (scoped to the authenticated user)
// This is not currently useful, it will become useful when 'contractors' can add contractor_team users.
router.get('/getallusers', authenticateUser, userController.getAllUsers);

// GET route to get a user by id (scoped to the authenticated user)
router.get('/:id/getuserbyid', authenticateUser, userController.getUserById);

// POST route to create a new user
router.post('/register', userController.createUser);

// PUT route to update user info
router.put('/:id/updateuser', userController.updateUser);

// DELETE route to delete user
router.delete('/:id/deleteuser', userController.deleteUser);

export default router;