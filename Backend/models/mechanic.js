const mongoose = require("mongoose");

const mechanicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    length: 10,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  address: {
    type: String,
  },
  coordinates: {},
  provide_services: [],
  notification: [],
  live_service: {},
  isAvailable: {
    type: Boolean,
    default: false,
  },
});

const Mechanic = mongoose.model("Mechanic", mechanicSchema);

module.exports = Mechanic;
