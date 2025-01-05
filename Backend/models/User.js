const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  mobile: {
    type: Number,
    require: true,
    length: 10,
  },
  email: {
    type: String,
    require: true,
  },
  plan: {
    planDetails: {
      type: mongoose.Schema.Types.ObjectId,
    },
    registered_vehicles: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "vehicle",
        },
      ],
    },
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
