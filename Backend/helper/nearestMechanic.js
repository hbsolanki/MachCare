const { Mechanic } = require("../models/index");

async function findNearestMechanic(location, selectedServices = []) {
  try {
    let query = {
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [location.longitude, location.latitude], // Correct Order
          },
          $maxDistance: 10000, // 10 KM radius
        },
      },
      isAvailable: true,
    };

    // Fetch mechanics and populate services
    let nearbyMechanics = await Mechanic.find(query).populate(
      "provide_services"
    );

    if (nearbyMechanics.length === 0) {
      return [];
    }

    // Convert selectedServices (names) to lowercase for comparison
    const lowerCaseSelectedServices = selectedServices.map((service) =>
      service.toLowerCase()
    );

    // Filter mechanics based on selected services by checking service names
    const filteredMechanics = nearbyMechanics.filter(
      (mechanic) =>
        selectedServices.length === 0 ||
        mechanic.provide_services.some((service) =>
          lowerCaseSelectedServices.includes(service.name.toLowerCase())
        )
    );

    return filteredMechanics;
  } catch (error) {
    console.error(error);
    return [];
  }
}

module.exports = findNearestMechanic;
