import express, { Router } from 'express';
import * as projectController from '../controllers/ProjectController';

const router: Router = express.Router();

// CRUD routes for project table
// GET route to get all projects.
router.get('/getprojects', projectController.getAllProjects);

// GET route to get a project by id.
router.get('/:id/getprojectbyid', projectController.getProjectById);

// POST route to create new project.
router.post('/createproject', projectController.createProject);

// PUT route to update project info
router.put('/:id/updateproject', projectController.updateProject);

// DELETE route to delete project
router.delete('/:id/deleteproject', projectController.deleteProject);

export default router;