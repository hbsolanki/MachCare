const express = require("express");
const router = express.Router();

// Import Models
const { User, Vehicle } = require("../models/index");

// Import Dependencies
const {
  encryptPassword,
  decryptPassword,
  comparePassword,
  sendToken,
  verifyToken,
} = require("../auth/auth");



router.post("/signup", async (req, res) => {
  try {
    const userData = req.body;
    userData.password = encryptPassword(userData.password);
    const user = new User(userData);
    const data = await user.save();
    res.status(201).json({ message: "User registered successfully", data });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find user in database
    const dbUser = await User.findOne({ email });
    if (!dbUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare hashed passwords
    const isMatch = comparePassword(password, dbUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = sendToken(dbUser._id, dbUser.email);
    localStorage.setItem('token', token);
    res.status(200).json({ message: "Login successful", token });
    return;

  } catch (error) {
    console.error("Error in sign-in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.post("/vehicle/new", async (req, res) => {
  console.log("Inside backend vehicle addition");
  console.log(req.body);
  res.send("Vehicle addition endpoint hit!");
});


router
  .route("/update")
  .all(verifyToken) // Middleware to verify token
  .get(async (req, res) => {
    try {
      const dbUser = await User.findById(req.id);
      if (dbUser) {
        console.log("User data:", dbUser);
        return res.json(dbUser);
      }
      res.status(404).json({ message: "User not found" });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  })
  .post(async (req, res) => {
    try {
      const updatedData = await User.findByIdAndUpdate(req.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (updatedData) {
        return res.status(200).json({ message: "Data updated successfully" });
      }
      res.status(500).json({ message: "Update failed" });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

module.exports = router;
