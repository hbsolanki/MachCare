import React from "react";

const VehicleSelection = ({
  userData,
  selectedVehicle,
  setSelectedVehicle,
}) => {
  return (
    <>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Select Vehicle for Service
      </h2>
      {userData?.registered_vehicles?.length > 0 ? (
        <ul className="bg-white shadow rounded-lg p-4">
          {userData.registered_vehicles.map((vehicle) => (
            <li key={vehicle._id} className="flex items-center gap-3 py-2">
              <input
                type="radio"
                name="selectedVehicle"
                value={vehicle._id}
                onChange={() => setSelectedVehicle(vehicle._id)}
                checked={selectedVehicle === vehicle._id}
              />
              <span className="text-gray-700">
                {vehicle.model} ({vehicle.vehicleNo}) -{" "}
                {vehicle.fuelType.toUpperCase()}, {vehicle.manufacturingYear}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No registered vehicles available.</p>
      )}
    </>
  );
};

export default VehicleSelection;
