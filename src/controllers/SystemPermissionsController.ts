import { Request, Response } from 'express';
import SystemPermissions from '../models/SystemPermissionsModel';

export async function getAllSystemPermissions(req: Request, res: Response) {
  try {
    const rows = await SystemPermissions.getAllSystemPermissions();
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export async function getSystemPermissionsById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const rows = await SystemPermissions.getSystemPermissionsById(id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export async function createSystemPermissions(req: Request, res: Response) {
  try {
    const { user_id, project_id } = req.body;
    await SystemPermissions.createSystemPermissions(user_id, project_id);
    res.status(200).send(`New system permissions record successfully created`);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export async function updateSystemPermissions(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { ...updates } = req.body; // Use spread operator to get all fields from req.body. Contractor can edit as many fields as needed/ permitted. 

    await SystemPermissions.updateSystemPermissions(id, updates);    
    res.status(200).json(`SystemPermissions with id ${id} successfully updated`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export async function deleteSystemPermissions(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await SystemPermissions.deleteSystemPermissions(id);
    res.status(200).send(`SystemPermissions with id ${id} successfully deleted`);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export default {
  getAllSystemPermissions,
  getSystemPermissionsById,
  createSystemPermissions,
  updateSystemPermissions,
  deleteSystemPermissions
};