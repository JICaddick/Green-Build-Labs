const ProjectMaterials = require('../models/ProjectMaterialsModel');

async function getAllProjectMaterials(req, res) {
  try {
    const rows = await ProjectMaterials.getAllProjectMaterials();
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

async function getProjectMaterialsById(req, res) {
  try {
    const rows = await ProjectMaterials.getProjectMaterialsById(req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

async function createProjectMaterials(req, res) {
  try {
    const {project_id, material_id, quantity} = req.body;
    await ProjectMaterials.createProjectMaterials(project_id, material_id, quantity);
    res.status(200).json(`Material successfully added to project`);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

async function updateProjectMaterials(req, res) {
  try {
    const { id } = req.params;
    const {project_id, material_id, quantity} = req.body;
    await ProjectMaterials.updateProjectMaterials(id, project_id, material_id, quantity);
    res.status(200).send(`ProjectMaterials with id ${id} successfully updated`);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

async function deleteProjectMaterials(req, res) {
  try {
    const { id } = req.params;
    await ProjectMaterials.deleteProjectMaterials(id);
    res.status(200).json(`Project material with id ${id} successfully deleted`);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = {
  getAllProjectMaterials,
  getProjectMaterialsById,
  createProjectMaterials,
  updateProjectMaterials,
  deleteProjectMaterials
};