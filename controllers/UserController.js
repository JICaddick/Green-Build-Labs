const User = require('../models/UserModel');

// This file defines the functions for each CRUD operation on the user table. Each function receives a request object and a response object and uses it's respective model to perform the appropriate database operation.
// They are the functions that serve as the route handlers for the user API. These functions call the corresponding static methods in the Project class and return the results to the client. 

async function getAllUsers(req, res) {
  try {
    const rows = await User.getAllUsers();
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const rows = await User.getUserById(id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

async function createUser(req, res) {
  try {
    const { email, password, role } = req.body;
    const rows = await User.createUser(email, password, role);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { email, password, role } = req.body;
    await User.updateUser(id, email, password, role);
    res.status(200).send(`User with id ${id} successfully updated`);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    await User.deleteUser(id);
    res.status(200).send(`User with id ${id} successfully deleted`);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};