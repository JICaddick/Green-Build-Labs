import { Request, Response } from 'express';
import ProjectMaterials from '../models/ProjectMaterialsModel';

export async function getAllProjectMaterials(req: Request, res: Response) {
  try {
    const rows = await ProjectMaterials.getAllProjectMaterials();
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export async function getProjectMaterialsById(req: Request, res: Response) {
  try {
    const rows = await ProjectMaterials.getProjectMaterialsById(req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export async function createProjectMaterials(req: Request, res: Response) {
  try {
    const {project_id, material_id, quantity} = req.body;
    await ProjectMaterials.createProjectMaterials(project_id, material_id, quantity);
    res.status(200).json(`Material successfully added to project`);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export async function updateProjectMaterials(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const {project_id, material_id, quantity} = req.body;
    await ProjectMaterials.updateProjectMaterials(id, project_id, material_id, quantity);
    res.status(200).send(`ProjectMaterials with id ${id} successfully updated`);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export async function deleteProjectMaterials(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await ProjectMaterials.deleteProjectMaterials(id);
    res.status(200).json(`Project material with id ${id} successfully deleted`);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export default {
  getAllProjectMaterials,
  getProjectMaterialsById,
  createProjectMaterials,
  updateProjectMaterials,
  deleteProjectMaterials
};