// routes/serviceAppointmentRoutes.js
const express = require('express');
const router = express.Router();
const serviceAppointmentController = require('../controllers/serviceAppointmentController');

// Create a new service appointment
router.post('/', serviceAppointmentController.createServiceAppointment);

// Get all service appointments
router.get('/', serviceAppointmentController.getAllServiceAppointments);

// Get a specific service appointment by ID
router.get('/:id', serviceAppointmentController.getServiceAppointmentById);

// Update a service appointment by ID
router.put('/:id', serviceAppointmentController.updateServiceAppointment);

// Delete a service appointment by ID
router.delete('/:id', serviceAppointmentController.deleteServiceAppointment);

module.exports = router;
