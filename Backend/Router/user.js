const express = require("express");
const router = express.Router();

// Import Models
const { User, Vehicle, Plan } = require("../models/index");

// Import Dependencies
const {
  encryptPassword,
  decryptPassword,
  comparePassword,
  sendToken,
  verifyToken,
} = require("../auth/auth");
const { db, findById } = require("../models/mechanic");

router.post("/signup", async (req, res) => {
  try {
    const userData = req.body;
    userData.password = encryptPassword(userData.password);
    const user = new User(userData);
    const data = await user.save();
    const token = sendToken(data._id, data.email);
    res.send({ message: "Login successful", token });
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
    res.status(200).json({ message: "Login successful", token });
    return;
  } catch (error) {
    console.error("Error in sign-in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router
  .route("/")
  .all(verifyToken)
  .get(async (req, res) => {
    try {
      const dbUser = await User.findById(req.id).populate(
        "registered_vehicles"
      );

      if (!dbUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Decrypt user password (if needed)
      dbUser.password = decryptPassword(dbUser.password);

      console.log("User data:", dbUser);

      return res.json(dbUser);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

router
  .route("/update")
  .all(verifyToken) // Middleware to verify token
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

router
  .route("/vehicle/data/:vid")
  .all(verifyToken)
  .get(async (req, res) => {
    try {
      const { vid } = req.params;
      const vehicle = await Vehicle.findById(vid);
      if (!vehicle) {
        return res.status(404).json({ message: "Vehicle not found" });
      }
      res.json(vehicle);
    } catch (error) {
      console.error("Error fetching vehicle:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
router.put("/plan/buy/:pid", verifyToken, async (req, res) => {
  try {
    let { pid } = req.params;

    // Find plan and user
    const planData = await Plan.findById(pid);
    const userData = await User.findById(req.id);

    if (!planData) {
      return res.status(404).json({ message: "Plan not found" });
    }
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Push plan ID to user's plan array
    userData.plan.push(planData);
    await userData.save();

    res
      .status(200)
      .json({ message: "Plan purchased successfully", user: userData });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router
  .route("/vehicle/update/:vid")
  .all(verifyToken)
  .put(async (req, res) => {
    try {
      const { vid } = req.params;
      const data = req.body;

      const vehicle = await Vehicle.findByIdAndUpdate(vid, data, {
        new: true,
        runValidators: true,
      });

      if (!vehicle) {
        return res.status(404).json({ message: "Vehicle not found" });
      }

      res
        .status(200)
        .json({ message: "Vehicle updated successfully", vehicle });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating vehicle", error: error.message });
    }
  });

router
  .route("/vehicle/delete/:vid")
  .all(verifyToken)
  .delete(async (req, res) => {
    try {
      const vid = req.params.vid;

      // Ensure `vid` is a valid MongoDB ObjectId
      if (!vid.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "Invalid vehicle ID format" });
      }

      const vehicle = await Vehicle.findByIdAndDelete(vid);

      if (!vehicle) {
        return res.status(404).json({ message: "Vehicle not found" });
      }

      res
        .status(200)
        .json({ message: "Vehicle deleted successfully", vehicle });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

router
  .route("/vehicle/new")
  .all(verifyToken)
  .post(async (req, res) => {
    try {
      console.log(req.body);

      // Create new vehicle
      let vehicle = new Vehicle(req.body);
      await vehicle.save(); // Save vehicle to DB

      // Find user and update their registered_vehicles array
      let user = await User.findById(req.id);

      user.registered_vehicles.push(vehicle._id);
      await user.save(); // Save updated user document

      res
        .status(201)
        .json({ message: "Vehicle registered successfully", vehicle });
    } catch (error) {
      console.error("Error registering vehicle:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

module.exports = router;
