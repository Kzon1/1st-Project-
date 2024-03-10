// routes/manufacturerRoutes.js
const express = require('express');
const router = express.Router();
const manufacturerController = require('../controllers/manufacturerController');

// Create a new manufacturer
router.post('/', manufacturerController.createManufacturer);

// Get all manufacturers
router.get('/', manufacturerController.getAllManufacturers);

// Get a specific manufacturer by ID
router.get('/:id', manufacturerController.getManufacturerById);

// Update a manufacturer by ID
router.put('/:id', manufacturerController.updateManufacturer);

// Delete a manufacturer by ID
router.delete('/:id', manufacturerController.deleteManufacturer);

module.exports = router;
