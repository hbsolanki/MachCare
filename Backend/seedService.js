const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config(); // Load environment variables

// Check if the model already exists to prevent OverwriteModelError
const Service =
  mongoose.models.Service ||
  mongoose.model(
    "Service",
    new mongoose.Schema({
      name: { type: String, required: true, unique: true, trim: true },
      description: { type: String, required: true, trim: true },
      range: { type: Number, required: true },
      vehicle: [{ type: String, enum: ["car", "bike"] }], // Added vehicle array
      price: { type: Number, required: true },
      service_in_plan: [{ type: mongoose.Schema.Types.ObjectId, ref: "Plan" }],
    })
  );

// Connect to MongoDB
async function main() {
  await mongoose.connect(process.env.DB_URL);
  console.log("DB connection established");
  await backupAndCreateServices();
  mongoose.connection.close(); // Close connection after seeding
}

// Backup old services and insert new ones
async function backupAndCreateServices() {
  try {
    const oldServices = await Service.find({});

    if (oldServices.length > 0) {
      fs.writeFileSync(
        "backup_services.json",
        JSON.stringify(oldServices, null, 2)
      );
      console.log("Backup of old services created successfully!");
    }

    await Service.deleteMany({});
    console.log("Old services removed!");

    const services = [
      {
        name: "Complete vehicle servicing",
        description: "Full check-up",
        range: 0,
        vehicle: ["car", "bike"],
        price: 200,
        service_in_plan: [],
      },
      {
        name: "Engine diagnostics",
        description: "Engine health check",
        range: 2,
        vehicle: ["car"],
        price: 100,
        service_in_plan: [],
      },
      {
        name: "Battery check",
        description: "Check and replace battery",
        range: 1,
        vehicle: ["car", "bike"],
        price: 50,
        service_in_plan: [],
      },
      {
        name: "Wheel alignment",
        description: "Balance wheels",
        range: 2,
        vehicle: ["car"],
        price: 80,
        service_in_plan: [],
      },
      {
        name: "Roadside assistance",
        description: "Emergency help",
        range: 3,
        vehicle: ["car", "bike"],
        price: 150,
        service_in_plan: [],
      },
    ];

    await Service.insertMany(services);
    console.log("New fake services added successfully!");
  } catch (err) {
    console.error("Error updating services:", err);
  }
}

// Run script
main().catch(console.error);

module.exports = Service;
