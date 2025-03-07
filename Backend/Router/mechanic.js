const express = require("express");
const router = express.Router();
module.exports = router;
const Mechanic = require("../models/mechanic");
const {
  encryptPassword,
  decryptPassword,
  comparePassword,
  sendToken,
  verifyToken,
} = require("../auth/auth");
router.get("/", verifyToken, async (req, res) => {
  try {
    const dbMechanic = await Mechanic.findById(req.id).populate(
      "provide_services"
    );

    if (!dbMechanic) {
      return res.status(404).json({ message: "Mechanic not found" });
    }

    // Decrypt Mechanic password (if needed)
    // dbMechanic.password = decryptPassword(dbMechanic.password);
    return res.json(dbMechanic);
  } catch (error) {
    console.error("Error fetching Mechanic:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/signup", async (req, res) => {
  try {
    const { email, password, ...otherData } = req.body;

    // Check if email already exists
    const existingUser = await Mechanic.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Encrypt password and create user
    const hashedPassword = encryptPassword(password);
    const mechanic = new Mechanic({
      email,
      password: hashedPassword,
      ...otherData,
    });
    const savedData = await mechanic.save();

    // Generate token
    const token = sendToken(savedData._id, savedData.email);
    res.status(201).json({ message: "Signup successful", token });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/service/update", verifyToken, async (req, res) => {
  try {
    const updatedData = await Mechanic.findByIdAndUpdate(
      req.id,
      { provide_services: req.body.services },
      { new: true, runValidators: true }
    );

    if (updatedData) {
      return res.status(200).json({ message: "Data updated successfully" });
    }
    res.status(500).json({ message: "Update failed" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find user in database
    const dbUser = await Mechanic.findOne({ email });
    if (!dbUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare hashed passwords
    // const isMatch = comparePassword(password, dbUser.password);
    // if (!isMatch) {
    //   return res.status(401).json({ message: "Invalid credentials" });
    // }

    // Generate JWT token
    const token = sendToken(dbUser._id, dbUser.email);
    res.status(200).json({ message: "Login successful", token });
    return;
  } catch (error) {
    console.error("Error in sign-in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/updateAvailability", verifyToken, async (req, res) => {
  try {
    const updatedData = await Mechanic.findByIdAndUpdate(
      req.id,
      { isAvailable: req.body.isAvailable },
      { new: true, runValidators: true }
    );

    if (updatedData) {
      return res.status(200).json({ message: "Data updated successfully" });
    }
    res.status(500).json({ message: "Update failed" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/profile/update", verifyToken, async (req, res) => {
  try {
    const updatedData = await Mechanic.findByIdAndUpdate(req.id, req.body, {
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
