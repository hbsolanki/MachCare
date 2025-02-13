const mongoose = require("mongoose");


const vehicleSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["bike", "car"],
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  vehicleNo: {
    type: String,
    required: true,
  },
  manufacturingYear: {
    type: Number,
  },
});

const Vehicle = mongoose.model('Vehicle',vehicleSchema);

module.exports = Vehicle;