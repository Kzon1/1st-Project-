// controllers/brandController.js
const Brand = require('../models/brandModel');

// Create a new brand
exports.createBrand = async (req, res) => {
  try {
    const { name } = req.body;
    const brand = new Brand({ name });
    await brand.save();
    res.status(201).json(brand);
  } catch (error) {
    res.status(500).json({ error: 'Error creating brand' });
  }
};

// Get all brands
exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching brands' });
  }
};

// Get a specific brand by ID
exports.getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching brand' });
  }
};

// Update a brand by ID
exports.updateBrand = async (req, res) => {
  try {
    const { name } = req.body;
    const brand = await Brand.findByIdAndUpdate(req.params.id, { name }, { new: true });
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: 'Error updating brand' });
  }
};

// Delete a brand by ID
exports.deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }
    res.status(200).json({ message: 'Brand deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting brand' });
  }
};
