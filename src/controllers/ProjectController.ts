import { Request, Response } from 'express';
import Project from '../models/ProjectModel';

export async function getAllProjects(req: Request, res: Response) {
  try {
    const rows = await Project.getAllProjects();
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export async function getProjectById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const rows = await Project.getProjectById(id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export async function createProject(req: Request, res: Response) {
  try {
    const { name, start_date, end_date, user_id } = req.body;
    await Project.createProject(name, start_date, end_date, user_id);
    res.status(200).json(`New project created with name ${name}, let's get to work!`);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export async function updateProject(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, start_date, end_date, user_id } = req.body;
    await Project.updateProject(id, name, start_date, end_date, user_id);
    res.status(200).send(`Project with id ${id} successfully updated`);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export async function deleteProject(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await Project.deleteProject(id);
    res.status(200).send(`Project with id ${id} successfully deleted`);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export default {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};