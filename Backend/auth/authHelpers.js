const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"; // Use environment variables for security

// 🔹 Hash Password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// 🔹 Compare Passwords
const comparePassword = async (enteredPassword, storedHash) => {
  return await bcrypt.compare(enteredPassword, storedHash);
};

// 🔹 Generate JWT Token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
    expiresIn: "24h", // Token expires in 24 hours
  });
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
};
