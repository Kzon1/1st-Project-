// models/ServiceAppointment.js
const mongoose = require('mongoose');

const serviceAppointmentSchema = new mongoose.Schema({
  car_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true,
  },
  service_type: {
    type: String,
    required: true,
  },
  appointment_date: Date,
});

const ServiceAppointment = mongoose.model('ServiceAppointment', serviceAppointmentSchema);

module.exports = ServiceAppointment;
