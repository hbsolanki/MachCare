const mongoose = require("mongoose");

const PlanSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
});
