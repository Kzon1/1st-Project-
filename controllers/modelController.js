// controllers/modelController.js
const Model = require('../models/modelModel');

// Create a new model
exports.createModel = async (req, res) => {
  try {
    const { name, brand_id } = req.body;
    const model = new Model({ name, brand_id });
    await model.save();
    res.status(201).json(model);
  } catch (error) {
    res.status(500).json({ error: 'Error creating model' });
  }
};

// Get all models
exports.getAllModels = async (req, res) => {
  try {
    const models = await Model.find();
    res.status(200).json(models);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching models' });
  }
};

// Get a specific model by ID
exports.getModelById = async (req, res) => {
  try {
    const model = await Model.findById(req.params.id);
    if (!model) {
      return res.status(404).json({ message: 'Model not found' });
    }
    res.status(200).json(model);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching model' });
  }
};

// Update a model by ID
exports.updateModel = async (req, res) => {
  try {
    const { name, brand_id } = req.body;
    const model = await Model.findByIdAndUpdate(req.params.id, { name, brand_id }, { new: true });
    if (!model) {
      return res.status(404).json({ message: 'Model not found' });
    }
    res.status(200).json(model);
  } catch (error) {
    res.status(500).json({ error: 'Error updating model' });
  }
};

// Delete a model by ID
exports.deleteModel = async (req, res) => {
  try {
    const model = await Model.findByIdAndDelete(req.params.id);
    if (!model) {
      return res.status(404).json({ message: 'Model not found' });
    }
    res.status(200).json({ message: 'Model deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting model' });
  }
};
