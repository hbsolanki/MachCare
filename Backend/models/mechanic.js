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
  mobileNo: {
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
  // location: {
  //   // type: { type: String, default: "Point" }, // GeoJSON type
  //   // coordinates: { type: [Number], required: true }, // [longitude, latitude]
  //   latitude: { type: Number },
  //   longitude: { type: Number },
  // },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  provide_services: [],
  notification: [],
  live_service: {},
  isAvailable: {
    type: Boolean,
    default: false,
  },
});

mechanicSchema.index({ location: "2dsphere" });
const Mechanic = mongoose.model("Mechanic", mechanicSchema);

module.exports = Mechanic;
