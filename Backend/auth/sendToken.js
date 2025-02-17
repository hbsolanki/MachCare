const jwt = require("jsonwebtoken");
function sendToken(userData) {
  const id = userData._id;

  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });

  return token ? token : null;
}

module.exports = sendToken;
