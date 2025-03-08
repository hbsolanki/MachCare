const mongoose = require("mongoose");
const Plan = require("./models/Plan"); // Import your Plan model
require("dotenv").config();

const DB_URL = process.env.DB_URL;

// Connect to your MongoDB
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// List of services to be added to plans
const services = [
  { name: "Oil Change", price: 500 },
  { name: "Brake Repair", price: 1500 },
  { name: "Battery Replacement", price: 2000 },
  { name: "Tire Alignment", price: 800 },
  { name: "Engine Tuning", price: 3000 },
  { name: "AC Repair", price: 1200 },
  { name: "Clutch Repair", price: 2500 },
  { name: "Suspension Check", price: 1800 },
  { name: "Exhaust System Repair", price: 2200 },
  { name: "Radiator Flush", price: 700 },
  { name: "Transmission Repair", price: 4500 },
  { name: "Headlight Restoration", price: 500 },
  { name: "Car Wash & Detailing", price: 600 },
];

// Function to generate fake plans
const generateFakePlans = async () => {
  // Delete existing plans
  await Plan.deleteMany({});

  // Create 7 fake plans with random services
  const fakePlans = [
    {
      name: "Basic Maintenance Plan",
      price: 2500,
      duration: 6, // in months
      services: [
        { name: "Oil Change", count: 1 },
        { name: "Car Wash & Detailing", count: 2 },
        { name: "Brake Repair", count: 1 },
      ],
    },
    {
      name: "Premium Maintenance Plan",
      price: 5000,
      duration: 12, // in months
      services: [
        { name: "Oil Change", count: 2 },
        { name: "Brake Repair", count: 2 },
        { name: "Engine Tuning", count: 1 },
        { name: "Suspension Check", count: 1 },
      ],
    },
    {
      name: "Basic Car Plan",
      price: 1500,
      duration: 3,
      services: [
        { name: "Headlight Restoration", count: 1 },
        { name: "Tire Alignment", count: 1 },
        { name: "Car Wash & Detailing", count: 1 },
      ],
    },
    {
      name: "Truck Repair Plan",
      price: 5500,
      duration: 9,
      services: [
        { name: "Engine Tuning", count: 1 },
        { name: "Suspension Check", count: 1 },
        { name: "Transmission Repair", count: 1 },
      ],
    },
    {
      name: "Bike Service Plan",
      price: 3500,
      duration: 6,
      services: [
        { name: "Clutch Repair", count: 1 },
        { name: "Oil Change", count: 2 },
        { name: "Radiator Flush", count: 1 },
      ],
    },
    {
      name: "Advanced Car Plan",
      price: 7000,
      duration: 12,
      services: [
        { name: "Battery Replacement", count: 1 },
        { name: "Exhaust System Repair", count: 1 },
        { name: "Transmission Repair", count: 1 },
        { name: "Brake Repair", count: 2 },
      ],
    },
    {
      name: "All-Inclusive Plan",
      price: 9000,
      duration: 24,
      services: [
        { name: "Oil Change", count: 3 },
        { name: "Brake Repair", count: 2 },
        { name: "Engine Tuning", count: 1 },
        { name: "Clutch Repair", count: 1 },
        { name: "Suspension Check", count: 2 },
        { name: "AC Repair", count: 1 },
      ],
    },
  ];

  // Add the fake plans to the database
  await Plan.insertMany(fakePlans);
  console.log("Fake plans added to the database!");
};

// Call the function to add the fake plans
generateFakePlans().catch((err) => {
  console.error("Error generating fake plans:", err);
});
