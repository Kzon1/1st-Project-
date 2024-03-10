// routes/brandRoutes.js
const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');

// Create a new brand
router.post('/', brandController.createBrand);

// Get all brands
router.get('/', brandController.getAllBrands);

// Get a specific brand by ID
router.get('/:id', brandController.getBrandById);

// Update a brand by ID
router.put('/:id', brandController.updateBrand);

// Delete a brand by ID
router.delete('/:id', brandController.deleteBrand);

module.exports = router;
