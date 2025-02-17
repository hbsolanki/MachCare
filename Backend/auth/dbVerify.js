const { User, Admin, Mechanic, Dealer } = require("../models/index");
const comparePassword = require("../helper/compareHash");
const sendToken = require("../auth/sendToken");

async function dbVerify(userData) {
  // selecting model according to user
  let model = null;
  if (userData.role == "user") model = User;
  else if (userData.role == "mechanic") model = Mechanic;
  else if (userData.role == "dealer") model = Dealer;
  else console.log("invalid role");

  // verifying user with db and send token
  try {

    const dbUser = await model.findOne({ email: userData.email });

    if (dbUser) {

      if (await comparePassword(userData.password, dbUser.password)) {
        const token = sendToken(dbUser);
        return token;
      } else {
        console.log("user is not valid");
        return null;
      }

    } else {
      console.log("user not found");
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = dbVerify;
