const mongoose = require("mongoose");
const Plan = require("./models/Plan"); // Adjust the path if needed

const MONGO_URI = "mongodb://127.0.0.1:27017/MechCare"; // Replace with your actual MongoDB URI

const fakePlans = [
  {
    name: "Basic Plan",
    price: 499,
    duration: 30,
    services: [
      { name: "Basic vehicle inspection", count: 1 },
      { name: "Oil check and top-up", count: 1 },
      { name: "Tire pressure check", count: 2 },
    ],
  },
  {
    name: "Standard Plan",
    price: 999,
    duration: 90,
    services: [
      { name: "Full vehicle inspection", count: 1 },
      { name: "Oil and filter change", count: 1 },
      { name: "Brake check and adjustment", count: 2 },
      { name: "Tire rotation", count: 2 },
    ],
  },
  {
    name: "Premium Plan",
    price: 1999,
    duration: 180,
    services: [
      { name: "Complete vehicle servicing", count: 1 },
      { name: "Engine diagnostics", count: 2 },
      { name: "Battery check and replacement if needed", count: 1 },
      { name: "Wheel alignment and balancing", count: 2 },
      { name: "Emergency roadside assistance", count: 3 },
    ],
  },
];

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected to MongoDB");

    // Clear existing plans
    await Plan.deleteMany();
    console.log("Existing plans removed");

    // Insert new plans
    await Plan.insertMany(fakePlans);
    console.log("Fake plans added successfully");

    mongoose.disconnect();
  })
  .catch((error) => {
    console.error("Database connection error:", error);
    mongoose.disconnect();
  });
