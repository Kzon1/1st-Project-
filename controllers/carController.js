// controllers/carController.js
const Car = require('../models/carModel');

// Create a new car
exports.createCar = async (req, res) => {
  try {
    const { model_id, year, color, price, status } = req.body;
    const car = new Car({ model_id, year, color, price, status });
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ error: 'Error creating car' });
  }
};

// Get all cars
exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cars' });
  }
};

// Get a specific car by ID
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching car' });
  }
};

// Update a car by ID
exports.updateCar = async (req, res) => {
  try {
    const { model_id, year, color, price, status } = req.body;
    const car = await Car.findByIdAndUpdate(req.params.id, { model_id, year, color, price, status }, { new: true });
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ error: 'Error updating car' });
  }
};

// Delete a car by ID
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting car' });
  }
};
