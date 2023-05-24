import express, { Router } from 'express';
import * as  projectCarbonEmissionsController  from '../controllers/ProjectCarbonEmissionsController';

const router: Router = express.Router();

// CRUD routes for project_carbon_emissions table
// GET route to get all project_carbon_emissions.
router.get('/getprojectcarbonemissions', projectCarbonEmissionsController.getAllProjectCarbonEmissions);

// GET route to get a project_carbon_emissions by id.
router.get('/:id/getprojectcarbonemissionsbyid', projectCarbonEmissionsController.getProjectCarbonEmissionsById);

// POST route to create new project_carbon_emissions.
router.post('/createprojectcarbonemissions', projectCarbonEmissionsController.createProjectCarbonEmissions);

// PUT route to update project_carbon_emissions info
router.put('/:id/updateprojectcarbonemissions', projectCarbonEmissionsController.updateProjectCarbonEmissions);

// DELETE route to delete project_carbon_emissions by id.
router.delete('/:id/deleteprojectcarbonemissions', projectCarbonEmissionsController.deleteProjectCarbonEmissions);

export default router;