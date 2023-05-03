var express = require('express');
var router = express.Router();
const materialController = require('../controllers/MaterialsController');

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

module.exports = router;