require("dotenv").config();
const mongoose = require("mongoose");
const Service = require("./models/Service"); // Adjust path if needed

const DB_URL = process.env.DB_URL;

const fakeServices = [
  {
    name: "Oil Change",
    description: "Full synthetic oil change",
    range: 10,
    vehicle: ["car", "bike"],
    price: 500,
  },
  {
    name: "Brake Repair",
    description: "Brake pad and rotor replacement",
    range: 20,
    vehicle: ["car", "truck"],
    price: 1500,
  },
  {
    name: "Battery Replacement",
    description: "New battery installation",
    range: 30,
    vehicle: ["car", "bike", "truck"],
    price: 2000,
  },
  {
    name: "Tire Alignment",
    description: "Wheel balancing and alignment",
    range: 15,
    vehicle: ["car"],
    price: 800,
  },
  {
    name: "Engine Tuning",
    description: "Performance tuning for better efficiency",
    range: 25,
    vehicle: ["car", "truck"],
    price: 3000,
  },
  {
    name: "AC Repair",
    description: "AC gas refill and servicing",
    range: 12,
    vehicle: ["car"],
    price: 1200,
  },
  {
    name: "Clutch Repair",
    description: "Clutch plate and assembly replacement",
    range: 18,
    vehicle: ["bike", "car"],
    price: 2500,
  },
  {
    name: "Suspension Check",
    description: "Shocks and struts inspection",
    range: 20,
    vehicle: ["car", "truck"],
    price: 1800,
  },
  {
    name: "Exhaust System Repair",
    description: "Muffler and catalytic converter repair",
    range: 22,
    vehicle: ["car", "truck"],
    price: 2200,
  },
  {
    name: "Radiator Flush",
    description: "Coolant change and radiator cleaning",
    range: 10,
    vehicle: ["car", "bike", "truck"],
    price: 700,
  },
  {
    name: "Transmission Repair",
    description: "Gearbox and transmission servicing",
    range: 30,
    vehicle: ["car", "truck"],
    price: 4500,
  },
  {
    name: "Headlight Restoration",
    description: "Cleaning and restoring headlights",
    range: 8,
    vehicle: ["car", "bike"],
    price: 500,
  },
  {
    name: "Car Wash & Detailing",
    description: "Complete exterior and interior cleaning",
    range: 5,
    vehicle: ["car", "bike", "truck"],
    price: 600,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    await Service.deleteMany(); // Clears existing services
    console.log("Old services deleted");

    await Service.insertMany(fakeServices);
    console.log("Fake services added successfully!");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

seedDatabase();
