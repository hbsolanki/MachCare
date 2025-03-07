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
const calculateDistance = (location1, location2) => {
  const toRadians = (degree) => (degree * Math.PI) / 180;

  const R = 6371; // Earth's radius in kilometers
  const lat1 = location1.latitude;
  const lon1 = location1.longitude;

  // Extract latitude and longitude from GeoJSON format
  const [lon2, lat2] = location2.coordinates;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  let distance = R * c; // Distance in kilometers

  // Convert to meters if less than 1km
  if (distance < 1) {
    distance = (distance * 1000).toFixed(0) + " meter";
  } else {
    distance = distance.toFixed(2) + " km";
  }

  return distance;
};

// Export both functions
module.exports = {
  findNearestMechanic,
  calculateDistance,
};
