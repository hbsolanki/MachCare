const mongoose = require("mongoose");
require("dotenv").config(); // For loading environment variables (DB_URL)

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensures service names are unique in the database
    trim: true, // Trims any extra spaces around the service name
  },
  description: {
    type: String,
    required: true,
    trim: true, // Trims extra spaces
  },
  range: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true, // Price for the service
  },
  service_in_plan: [{ type: mongoose.Schema.Types.ObjectId, ref: "Plan" }],
});

const Service = mongoose.model("Service", serviceSchema);

// Connecting to mongoose server
main()
  .then(() => {
    console.log("db connection established");
    createFakeServices(); // Call to create fake data after successful DB connection
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

// Create fake data for the services
async function createFakeServices() {
  try {
    // Clear the existing services (Optional, if you want to start fresh)
    await Service.deleteMany({});

    // List of services to be added
    const services = [
      {
        name: "Complete vehicle servicing",
        description: "Comprehensive check-up and servicing of the vehicle.",
        range: 0,
        price: 200, // Example price
        service_in_plan: [],
      },
      {
        name: "Engine diagnostics",
        description: "Detailed diagnostics of the engine health.",
        range: 2,
        price: 100, // Example price
        service_in_plan: [],
      },
      {
        name: "Battery check and replacement if needed",
        description: "Check and replace the vehicle battery if necessary.",
        range: 1,
        price: 50, // Example price
        service_in_plan: [],
      },
      {
        name: "Wheel alignment and balancing",
        description:
          "Align and balance the vehicle wheels for optimal performance.",
        range: 2,
        price: 80, // Example price
        service_in_plan: [],
      },
      {
        name: "Emergency roadside assistance",
        description:
          "Assistance in case of a roadside emergency like a flat tire.",
        range: 3,
        price: 150, // Example price
        service_in_plan: [],
      },
      {
        name: "Basic vehicle inspection",
        description: "Basic inspection of vehicle parts and systems.",
        range: 3,
        price: 60, // Example price
        service_in_plan: [],
      },
      {
        name: "Oil check and top-up",
        description: "Check the oil levels and top-up if needed.",
        range: 3,
        price: 40, // Example price
        service_in_plan: [],
      },
      {
        name: "Tire pressure check",
        description: "Check and adjust tire pressure for safety.",
        range: 0,
        price: 10, // Example price
        service_in_plan: [],
      },
    ];

    // Insert the services into the database
    await Service.insertMany(services);
    console.log("Fake services have been added successfully!");
  } catch (err) {
    console.error("Error while adding fake services:", err);
  } finally {
    // Close the connection after inserting data
    mongoose.connection.close();
  }
}
