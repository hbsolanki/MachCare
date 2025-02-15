const mongoose = require("mongoose");

const dealerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  plans: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "plan",
      default: [],
    },
  ],
});

const Dealer = mongoose.model("Dealer",dealerSchema);

module.exports = Dealer;
