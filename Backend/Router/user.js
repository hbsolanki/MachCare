const express = require("express");
const router = express.Router();

// Import Models
const { User, Vehicle } = require("../models/index");

// Import Dependencies
const bodyParser = require("body-parser");
const getHashPassword = require("../helper/getHash");
const comparePassword = require("../helper/compareHash");
const verifyToken = require("../auth/verifyToken");
const sendToken = require("../auth/sendToken");

// Middleware for parsing requests
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/**
 * @route   POST /API/user/signup
 * @desc    Register a new user
 * @access  Public
 */
router.post("/signup", async (req, res) => {
  try {
    const userData = req.body;
    userData.password = await getHashPassword(userData.password);

    const user = new User(userData);
    const data = await user.save();
    res.status(201).json({ message: "User registered successfully", data });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * @route   POST /API/user/signin
 * @desc    Authenticate user and return token
 * @access  Public
 */
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("User attempting to sign in:", email);

    // Find user in database
    const dbUser = await User.findOne({ email });
    if (!dbUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare hashed passwords
    const isMatch = await comparePassword(password, dbUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = sendToken(dbUser);
    console.log(token);
    res.cookie("token", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      // secure: true,
      // sameSite: "strict",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error in sign-in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * @route   POST /API/user/vehicle/new
 * @desc    Add new vehicle for a user
 * @access  Private (Protected route)
 */
router.post("/vehicle/new", async (req, res) => {
  console.log("Inside backend vehicle addition");
  console.log(req.body);
  res.send("Vehicle addition endpoint hit!");
});

/**
 * @route   GET/POST /API/user/update
 * @desc    Get and update user profile
 * @access  Private (Requires Authentication)
 */
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
