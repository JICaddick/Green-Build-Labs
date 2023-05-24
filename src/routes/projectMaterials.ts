import express, { Router } from 'express';
import * as projectMaterialsController from '../controllers/ProjectMaterialsController';

const router: Router = express.Router();

// CRUD routes for project_materials table
// GET route to get all project_materials.
router.get('/getprojectmaterials', projectMaterialsController.getAllProjectMaterials);

// GET route to get a project_materials by id.
router.get('/:id/getprojectmaterialsbyid', projectMaterialsController.getProjectMaterialsById);

// POST route to create new project_materials.
router.post('/createprojectmaterials', projectMaterialsController.createProjectMaterials);

// PUT route to update project_materials info
router.put('/:id/updateprojectmaterials', projectMaterialsController.updateProjectMaterials);

// DELETE route to delete project_materials by id.
router.delete('/:id/deleteprojectmaterials', projectMaterialsController.deleteProjectMaterials);

export default router;