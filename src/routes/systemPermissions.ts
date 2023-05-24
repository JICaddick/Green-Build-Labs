import express, { Router } from 'express';
import * as systemPermissionsController from '../controllers/SystemPermissionsController';

const router: Router = express.Router();

// CRUD routes for systemPermissions table
// GET route to get all systemPermissions.
router.get('/getsystempermissions', systemPermissionsController.getAllSystemPermissions);

// GET route to get a systemPermissions by id.
router.get('/:id/getsystempermissionsbyid', systemPermissionsController.getSystemPermissionsById);

// POST route to create new systemPermissions.
router.post('/createsystempermissions', systemPermissionsController.createSystemPermissions);

// PUT route to update a systemPermissions by id.
router.put('/:id/updatesystempermissions', systemPermissionsController.updateSystemPermissions);

// DELETE route to delete a systemPermissions by id.
router.delete('/:id/deletesystempermissions', systemPermissionsController.deleteSystemPermissions);

export default router;