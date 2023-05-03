const Material = require('../models/MaterialsModel');

async function getAllMaterials(req, res) {
  try {
    const rows = await Material.getAllMaterials();
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

async function getMaterial(req, res) {
  try {
    const { id } = req.params;
    const rows = await Material.getMaterial(id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

async function addMaterial(req, res) {
  try {
    const { name, unit, carbon_emissions_per_unit } = req.body;
    const rows = await Material.addMaterial(name, unit, carbon_emissions_per_unit);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

async function updateMaterial(req, res) {
  try {
    const { id } = req.params;
    const { name, unit, carbon_emissions_per_unit } = req.body;
    await Material.updateMaterial(id, name, unit, carbon_emissions_per_unit);
    res.status(200).send(`Material with id ${id} successfully updated`);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

async function deleteMaterial(req, res) {
  try {
    const { id } = req.params;
    await Material.deleteMaterial(id);
    res.status(200).send(`Material with id ${id} successfully deleted`);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = {
  getAllMaterials,
  getMaterial,
  addMaterial,
  updateMaterial,
  deleteMaterial
};
