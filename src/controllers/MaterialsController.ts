import { Request, Response } from 'express';
import Material from '../models/MaterialsModel';

export async function getAllMaterials(req: Request, res: Response) {
  try {
    const rows = await Material.getAllMaterials();
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export async function getMaterial(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const rows = await Material.getMaterial(id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export async function addMaterial(req: Request, res: Response) {
  try {
    const { name, unit, carbon_emissions_per_unit } = req.body;
    await Material.addMaterial(name, unit, carbon_emissions_per_unit);
    res.status(200).json(`New material, ${name}, successfully created`);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export async function updateMaterial(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, unit, carbon_emissions_per_unit } = req.body;
    await Material.updateMaterial(id, name, unit, carbon_emissions_per_unit);
    res.status(200).send(`Material with id ${id} successfully updated`);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export async function deleteMaterial(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await Material.deleteMaterial(id);
    res.status(200).send(`Material with id ${id} successfully deleted`);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export default {
  getAllMaterials,
  getMaterial,
  addMaterial,
  updateMaterial,
  deleteMaterial
};
