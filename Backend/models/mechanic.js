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
    default: 0,
    min: 0,
    max: 5,
  },
  grade: {
    type: String,
    enum: ["A", "B", "C", "D"], // Enum values
    default: "D", // Default grade
  },
  address: {
    type: String,
  },
  location: {
    type: { type: String, default: "Point" }, // GeoJSON type
    coordinates: {
      type: [Number],
      default: [72.8777, 19.076], // Default: [longitude, latitude] (Example: Mumbai, India)
    },
  },
  provide_services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
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
