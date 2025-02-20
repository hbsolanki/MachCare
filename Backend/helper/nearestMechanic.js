const { Mechanic } = require("../models/index");

// Function to find nearest mechanics within 10 KM
async function findNearestMechanic(location, selectedServices = []) {
  try {
    console.log("🔍 Searching for mechanics within 10 KM...");
    console.log("📍 User Location:", location);
    console.log("🛠 Selected Services:", selectedServices);

    if (!location || !location.latitude || !location.longitude) {
      console.error("❌ Invalid user location!", location);
      return null;
    }

    // ✅ Find mechanics within 10 KM radius
    const nearbyMechanics = await Mechanic.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [location.longitude, location.latitude], // MongoDB format
          },
          $maxDistance: 10000, // 10 KM radius
        },
      },
      isAvailable: true, // Only available mechanics
    });

    if (nearbyMechanics.length === 0) {
      console.log("❌ No mechanics found nearby.");
      return [];
    }

    console.log(
      "✅ Nearby Mechanics Found:",
      nearbyMechanics.map((m) => m.name)
    );

    // ✅ Filter mechanics based on provided services
    const filteredMechanics = nearbyMechanics.filter(
      (mechanic) =>
        selectedServices.length === 0 ||
        selectedServices.some((service) =>
          mechanic.provide_services.includes(service)
        )
    );

    if (filteredMechanics.length === 0) {
      console.log("❌ No mechanics found offering the selected services.");
      return [];
    }

    console.log(
      "🚀 Mechanics Ready:",
      filteredMechanics.map((m) => m.name)
    );
    return filteredMechanics;
  } catch (error) {
    console.error("❌ Error finding nearest mechanics:", error);
    return [];
  }
}

module.exports = findNearestMechanic;
