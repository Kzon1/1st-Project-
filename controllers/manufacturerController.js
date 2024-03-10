// controllers/manufacturerController.js
const Manufacturer = require('../models/manufacturerModel');

// Create a new manufacturer
exports.createManufacturer = async (req, res) => {
  try {
    const { name } = req.body;
    const manufacturer = new Manufacturer({ name });
    await manufacturer.save();
    res.status(201).json(manufacturer);
  } catch (error) {
    res.status(500).json({ error: 'Error creating manufacturer' });
  }
};

// Get all manufacturers
exports.getAllManufacturers = async (req, res) => {
  try {
    const manufacturers = await Manufacturer.find();
    res.status(200).json(manufacturers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching manufacturers' });
  }
};

// Get a specific manufacturer by ID
exports.getManufacturerById = async (req, res) => {
  try {
    const manufacturer = await Manufacturer.findById(req.params.id);
    if (!manufacturer) {
      return res.status(404).json({ message: 'Manufacturer not found' });
    }
    res.status(200).json(manufacturer);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching manufacturer' });
  }
};

// Update a manufacturer by ID
exports.updateManufacturer = async (req, res) => {
  try {
    const { name } = req.body;
    const manufacturer = await Manufacturer.findByIdAndUpdate(req.params.id, { name }, { new: true });
    if (!manufacturer) {
      return res.status(404).json({ message: 'Manufacturer not found' });
    }
    res.status(200).json(manufacturer);
  } catch (error) {
    res.status(500).json({ error: 'Error updating manufacturer' });
  }
};

// Delete a manufacturer by ID
exports.deleteManufacturer = async (req, res) => {
  try {
    const manufacturer = await Manufacturer.findByIdAndDelete(req.params.id);
    if (!manufacturer) {
      return res.status(404).json({ message: 'Manufacturer not found' });
    }
    res.status(200).json({ message: 'Manufacturer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting manufacturer' });
  }
};
