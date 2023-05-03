const Project = require('../models/ProjectModel');

async function getAllProjects(req, res) {
  try {
    const rows = await Project.getAllProjects();
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

async function getProjectById(req, res) {
  try {
    const { id } = req.params;
    const rows = await Project.getProjectById(id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

async function createProject(req, res) {
  try {
    const { name, start_date, end_date, user_id } = req.body;
    const rows = await Project.createProject(name, start_date, end_date, user_id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

async function updateProject(req, res) {
  try {
    const { id } = req.params;
    const { name, start_date, end_date, user_id } = req.body;
    await Project.updateProject(id, name, start_date, end_date, user_id);
    res.status(200).send(`Project with id ${id} successfully updated`);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

async function deleteProject(req, res) {
  try {
    const { id } = req.params;
    await Project.deleteProject(id);
    res.status(200).send(`Project with id ${id} successfully deleted`);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};