import React, { useEffect, useState } from "react";
import axios from "axios";
import { getGlobalVariable } from "../../globalVariable";
import { getUserLocation } from "../helper/getLocation";
import toast, { Toaster } from "react-hot-toast";
import MechanicList from "./NeedHelp/MechanicList";
import VehicleSelection from "./NeedHelp/VehicleSelection";
import ServiceSelection from "./NeedHelp/ServiceSelection";

const Backend = getGlobalVariable();

function NeedHelp() {
  const [userData, setUserData] = useState(null);
  const [availableServices, setAvailableServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [location, setLocation] = useState(
    JSON.parse(localStorage.getItem("userLocation")) || null
  );
  const [locationPermission, setLocationPermission] = useState(!!location);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [nearMechanic, setNearMechanic] = useState([]);

  useEffect(() => {
    if (!location) {
      requestLocation();
    } else {
      fetchUserData(); // Fetch user data if location is already stored
    }
  }, []);

  const requestLocation = async () => {
    try {
      const data = await getUserLocation();
      const newLocation = {
        longitude: data.longitude,
        latitude: data.latitude,
      };
      setLocation(newLocation);
      setLocationPermission(true);
      localStorage.setItem("userLocation", JSON.stringify(newLocation));
      fetchUserData(); // Fetch user data only after location is available
    } catch (err) {
      toast.error("Location access denied. Please enable location services.");
    }
  };

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${Backend}/API/user`, {
        headers: { token: localStorage.token },
      });
      setUserData(res.data);
      calculateUserServices(res.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const calculateUserServices = (userData) => {
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
      toast.error("Please enable location services first.");
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
        toast.error("No Nearby Mechanic Available");
      }
    } catch (error) {
      console.error("Error finding mechanics:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Toaster />

      {!locationPermission ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="mb-4 text-lg font-semibold">
            Please allow location access to continue
          </p>
          <button
            onClick={requestLocation}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Enable Location
          </button>
        </div>
      ) : nearMechanic.length > 0 ? (
        <MechanicList mechanics={nearMechanic} />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-600">
              Location: {location?.latitude}, {location?.longitude}
            </p>
            <button
              onClick={requestLocation}
              className="px-3 py-1 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700"
            >
              Refresh Location
            </button>
          </div>

          <VehicleSelection
            userData={userData}
            selectedVehicle={selectedVehicle}
            setSelectedVehicle={setSelectedVehicle}
          />
          <ServiceSelection
            availableServices={availableServices}
            selectedServices={selectedServices}
            setSelectedServices={setSelectedServices}
          />
          {availableServices.length > 0 &&
            selectedVehicle &&
            selectedServices.length > 0 && (
              <button
                onClick={handleSubmit}
                className={`mt-4 px-4 py-2 text-white font-semibold rounded-lg ${
                  !location
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={!location}
              >
                Request
              </button>
            )}
        </>
      )}
    </div>
  );
}

export default NeedHelp;
