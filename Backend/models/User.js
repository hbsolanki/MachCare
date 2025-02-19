const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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
    minlength: 10,
    maxlength: 10,
  },
  plan: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "plan",
      default: [],
    },
  ],
  registered_vehicles: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
  ],
});

// ✅ Check if the model already exists before defining it
const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;
