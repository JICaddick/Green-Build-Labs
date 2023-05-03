const SystemPermissions = require('../models/SystemPermissionsModel');

async function getAllSystemPermissions(req, res) {
  try {
    const rows = await SystemPermissions.getAllSystemPermissions();
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

async function getSystemPermissionsById(req, res) {
  try {
    const { id } = req.params;
    const rows = await SystemPermissions.getSystemPermissionsById(id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

async function createSystemPermissions(req, res) {
  try {
    const { user_id, project_id } = req.body;
    await SystemPermissions.createSystemPermissions(user_id, project_id);
    res.status(200).send(`SystemPermissions successfully created`);
  } 
  catch (error) {
    res.status(400).send(error.message)
  }
}

async function updateSystemPermissions(req, res) {
  try {
    const { id } = req.params;
    const { ...updates } = req.body; // Use spread operator to get all fields from req.body

    await SystemPermissions.updateSystemPermissions(id, updates);    
    res.status(200).json(`SystemPermissions with id ${id} successfully updated`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

async function deleteSystemPermissions(req, res) {
  try {
    const { id } = req.params;
    await SystemPermissions.deleteSystemPermissions(id);
    res.status(200).send(`SystemPermissions with id ${id} successfully deleted`);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = {
  getAllSystemPermissions,
  getSystemPermissionsById,
  createSystemPermissions,
  updateSystemPermissions,
  deleteSystemPermissions
};