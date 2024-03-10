// controllers/saleController.js
const Sale = require('../models/saleModel');

// Create a new sale
exports.createSale = async (req, res) => {
  try {
    const { car_id, buyer_id } = req.body;
    const sale = new Sale({ car_id, buyer_id });
    await sale.save();
    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ error: 'Error creating sale' });
  }
};

// Get all sales
exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find();
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching sales' });
  }
};

// Get a specific sale by ID
exports.getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching sale' });
  }
};

// Update a sale by ID
exports.updateSale = async (req, res) => {
  try {
    const { car_id, buyer_id } = req.body;
    const sale = await Sale.findByIdAndUpdate(req.params.id, { car_id, buyer_id }, { new: true });
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({ error: 'Error updating sale' });
  }
};

// Delete a sale by ID
exports.deleteSale = async (req, res) => {
  try {
    const sale = await Sale.findByIdAndDelete(req.params.id);
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.status(200).json({ message: 'Sale deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting sale' });
  }
};
