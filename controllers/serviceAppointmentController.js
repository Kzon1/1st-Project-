// controllers/serviceAppointmentController.js
const ServiceAppointment = require('../models/serviceappointmentModel');

// Create a new service appointment
exports.createServiceAppointment = async (req, res) => {
  try {
    const { car_id, service_type, appointment_date } = req.body;
    const serviceAppointment = new ServiceAppointment({ car_id, service_type, appointment_date });
    await serviceAppointment.save();
    res.status(201).json(serviceAppointment);
  } catch (error) {
    res.status(500).json({ error: 'Error creating service appointment' });
  }
};

// Get all service appointments
exports.getAllServiceAppointments = async (req, res) => {
  try {
    const serviceAppointments = await ServiceAppointment.find();
    res.status(200).json(serviceAppointments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching service appointments' });
  }
};

// Get a specific service appointment by ID
exports.getServiceAppointmentById = async (req, res) => {
  try {
    const serviceAppointment = await ServiceAppointment.findById(req.params.id);
    if (!serviceAppointment) {
      return res.status(404).json({ message: 'Service appointment not found' });
    }
    res.status(200).json(serviceAppointment);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching service appointment' });
  }
};

// Update a service appointment by ID
exports.updateServiceAppointment = async (req, res) => {
  try {
    const { car_id, service_type, appointment_date } = req.body;
    const serviceAppointment = await ServiceAppointment.findByIdAndUpdate(
      req.params.id,
      { car_id, service_type, appointment_date },
      { new: true }
    );
    if (!serviceAppointment) {
      return res.status(404).json({ message: 'Service appointment not found' });
    }
    res.status(200).json(serviceAppointment);
  } catch (error) {
    res.status(500).json({ error: 'Error updating service appointment' });
  }
};

// Delete a service appointment by ID
exports.deleteServiceAppointment = async (req, res) => {
  try {
    const serviceAppointment = await ServiceAppointment.findByIdAndDelete(req.params.id);
    if (!serviceAppointment) {
      return res.status(404).json({ message: 'Service appointment not found' });
    }
    res.status(200).json({ message: 'Service appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting service appointment' });
  }
};
