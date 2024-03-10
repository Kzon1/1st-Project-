// models/carModel.js
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  model_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Model',
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  color: String,
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['AVAILABLE', 'SOLD', 'UNDER_REPAIR'],
    required: true,
  },
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
