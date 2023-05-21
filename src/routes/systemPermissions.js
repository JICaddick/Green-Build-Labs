var express = require('express');
var router = express.Router();
const systemPermissionsController = require('../controllers/SystemPermissionsController');

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

module.exports = router;