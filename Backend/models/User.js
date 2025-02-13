const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    minlength: 10, 
    maxlength: 10,
  },
  email: {
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true,
  },
  plan:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "plan"
    }
  ],
  registered_vehicles:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vehicle"
    }
  ]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;