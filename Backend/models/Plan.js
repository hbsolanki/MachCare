const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  services: {
    type: [
      {
        name: { type: String, required: true },
        count: { type: Number, required: true },
      },
    ],
    default: [],
    required: true,
  },
});

// ✅ Check if the model already exists before defining it
const Plan = mongoose.models.Plan || mongoose.model("Plan", PlanSchema);

module.exports = Plan;
