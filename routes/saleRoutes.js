// routes/saleRoutes.js
const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');

// Create a new sale
router.post('/', saleController.createSale);

// Get all sales
router.get('/', saleController.getAllSales);

// Get a specific sale by ID
router.get('/:id', saleController.getSaleById);

// Update a sale by ID
router.put('/:id', saleController.updateSale);

// Delete a sale by ID
router.delete('/:id', saleController.deleteSale);

module.exports = router;
