import express, { Router } from 'express';
import * as materialController from '../controllers/MaterialsController';

const router: Router = express.Router();

//CRUD routes for materials table
//GET route to get all materials.
router.get('/getmaterials', materialController.getAllMaterials);

//GET route to get a single material.
router.get('/:id/getmaterial', materialController.getMaterial);

//POST route to add a new material.
router.post('/addmaterial', materialController.addMaterial);

//PUT route to update a material.
router.put('/:id/updatematerial', materialController.updateMaterial);

// DELETE route to delete material
router.delete('/:id/deletematerial', materialController.deleteMaterial);

export default router;