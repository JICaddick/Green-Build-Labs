import { Request, Response } from 'express';
import ProjectCarbonEmissions from '../models/ProjectCarbonEmissionsModel';

export async function getAllProjectCarbonEmissions(req: Request, res: Response) {
  try {
    const rows = await ProjectCarbonEmissions.getAllProjectCarbonEmissions();
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export async function getProjectCarbonEmissionsById(req: Request, res: Response) {
  try {
    const rows = await ProjectCarbonEmissions.getProjectCarbonEmissionsById(req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export async function createProjectCarbonEmissions(req: Request, res: Response) {
  try {
    const {project_id, total_carbon_emissions} = req.body;
    await ProjectCarbonEmissions.createProjectCarbonEmissions(project_id, total_carbon_emissions);
    res.status(200).json(`Your project's carbon emissions have been successfully calculated`);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export async function updateProjectCarbonEmissions(req: Request, res: Response) {
  try {
    const {project_id, total_carbon_emissions} = req.body;
    await ProjectCarbonEmissions.updateProjectCarbonEmissions(req.params.id, project_id, total_carbon_emissions);
    res.status(200).json(`Project carbon emissions with id ${req.params.id} successfully updated`);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export async function deleteProjectCarbonEmissions(req: Request, res: Response) {
  try {
    await ProjectCarbonEmissions.deleteProjectCarbonEmissions(req.params.id);
    res.status(200).json(`Project carbon emissions with id ${req.params.id} successfully deleted, bu-bye`);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export default{
  getAllProjectCarbonEmissions,
  getProjectCarbonEmissionsById,
  createProjectCarbonEmissions,
  updateProjectCarbonEmissions,
  deleteProjectCarbonEmissions
};
