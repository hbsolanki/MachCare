const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensures service names are unique in the database
    trim: true, // Trims any extra spaces around the service name
  },
  description: {
    type: String,
    required: true,
    trim: true, // Trims extra spaces
  },
  range: {
    type: Number,
    required: true,
  },
  vehicle: [
    {
      type: String,
      enum: ["car", "bike", "truck"], // Ensures only these values are allowed
    },
  ],
  price: {
    type: Number,
    required: true, // Price for the service
  },
  service_in_plan: [{ type: mongoose.Schema.Types.ObjectId, ref: "Plan" }],
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
