import React, { useEffect, useState } from "react";
import axios from "axios";
import { getGlobalVariable } from "../../globalVariable";
import { getUserLocation } from "../helper/getLocation";

import toast, { Toaster } from "react-hot-toast"; // ✅ Import react-hot-toast

const Backend = getGlobalVariable();

function NeedHelp() {
  const [userData, setUserData] = useState(null);
  const [availableServices, setAvailableServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [location, setLocation] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [nearMechanic, setNearMechanic] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${Backend}/API/user`, {
          headers: { token: localStorage.token },
        });
        setUserData(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserLocation()
      .then((data) => {
        setLocation({ longitude: data.longitude, latitude: data.latitude });
      })
      .catch((err) => console.log("Error fetching location:", err));

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData && userData.plan.length > 0) {
      calculateUserServices();
    }
  }, [userData]);

  const calculateUserServices = () => {
    let totalServices = [];

    userData.plan.forEach((plan) => {
      plan.services.forEach((service) => {
        const existingService = totalServices.find(
          (s) => s.name === service.name
        );
        if (existingService) {
          existingService.count += service.count;
        } else {
          totalServices.push({ name: service.name, count: service.count });
        }
      });
    });

    setAvailableServices(totalServices);
  };

  const handleSubmit = async () => {
    if (!location) {
      console.log("Location not available yet.");
      return;
    }

    try {
      const res = await axios.post(
        `${Backend}/API/user/service/need/findMechanic`,
        {
          location: {
            longitude: location.longitude,
            latitude: location.latitude,
          },
          selectedServices,
          selectedVehicle,
        },
        { headers: { token: localStorage.token } }
      );
      setNearMechanic(res.data);
      if (res.data.length === 0) {
        toast.error("No Near Mechanic Available");
      }
    } catch (error) {
      console.error("Error finding mechanics:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {nearMechanic.length > 0 ? (
        <>
          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
            Nearby Mechanics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nearMechanic.map((mechanic) => (
              <div
                key={mechanic._id}
                className="bg-white shadow-lg rounded-lg p-4 flex flex-col"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {mechanic.name}
                </h3>
                <p className="text-gray-600">📧 {mechanic.email}</p>
                <p className="text-gray-600">📞 {mechanic.mobileNo}</p>
                <p className="text-gray-600">
                  📍 Location: {mechanic.location.coordinates.join(", ")}
                </p>

                <p className="text-gray-600 font-semibold mt-2">
                  Services Offered:
                </p>
                <ul className="list-disc pl-5">
                  {mechanic.provide_services.map((service) => (
                    <li key={service._id} className="text-gray-700">
                      {service.name}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center">
                  <button className="text-blue-700">Select Mechanic</button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
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
                    {vehicle.fuelType.toUpperCase()},{" "}
                    {vehicle.manufacturingYear}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No registered vehicles available.</p>
          )}

          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
            Available Services
          </h2>

          {availableServices.length > 0 ? (
            <ul className="bg-white shadow rounded-lg p-4">
              {availableServices.map((service, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between border-b py-2"
                >
                  <label
                    className={`flex items-center gap-3 cursor-pointer ${
                      service.count === 0 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service.name)}
                      onChange={() =>
                        setSelectedServices((prevSelected) =>
                          prevSelected.includes(service.name)
                            ? prevSelected.filter(
                                (name) => name !== service.name
                              )
                            : [...prevSelected, service.name]
                        )
                      }
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded cursor-pointer"
                      disabled={service.count === 0}
                    />
                    <span className="text-gray-700">{service.name}</span>
                  </label>
                  <span className="font-semibold text-blue-600">
                    x {service.count}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No services available.</p>
          )}

          {availableServices.length > 0 &&
            selectedVehicle &&
            selectedServices.length > 0 && (
              <button
                onClick={handleSubmit}
                className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
              >
                Submit Request
              </button>
            )}
        </>
      )}
    </div>
  );
}

export default NeedHelp;
