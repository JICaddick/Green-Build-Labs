const ProjectCarbonEmissions = require('../models/ProjectCarbonEmissionsModel');

async function getAllProjectCarbonEmissions(req, res) {
  try {
    const rows = await ProjectCarbonEmissions.getAllProjectCarbonEmissions();
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

async function getProjectCarbonEmissionsById(req, res) {
  try {
    const rows = await ProjectCarbonEmissions.getProjectCarbonEmissionsById(req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

async function createProjectCarbonEmissions(req, res) {
  try {
    const {project_id, total_carbon_emissions} = req.body;

    const result = await ProjectCarbonEmissions.createProjectCarbonEmissions(project_id, total_carbon_emissions);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

async function updateProjectCarbonEmissions(req, res) {
  try {
    const {project_id, total_carbon_emissions} = req.body;

    const result = await ProjectCarbonEmissions.updateProjectCarbonEmissions(req.params.id, project_id, total_carbon_emissions);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

async function deleteProjectCarbonEmissions(req, res) {
  try {
    const result = await ProjectCarbonEmissions.deleteProjectCarbonEmissions(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error.message)
  }
}


module.exports = {
  getAllProjectCarbonEmissions,
  getProjectCarbonEmissionsById,
  createProjectCarbonEmissions,
  updateProjectCarbonEmissions,
  deleteProjectCarbonEmissions
};
