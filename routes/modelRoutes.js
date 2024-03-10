// routes/modelRoutes.js
const express = require('express');
const router = express.Router();
const modelController = require('../controllers/modelController');

// Create a new model
router.post('/', modelController.createModel);

// Get all models
router.get('/', modelController.getAllModels);

// Get a specific model by ID
router.get('/:id', modelController.getModelById);

// Update a model by ID
router.put('/:id', modelController.updateModel);

// Delete a model by ID
router.delete('/:id', modelController.deleteModel);

module.exports = router;
