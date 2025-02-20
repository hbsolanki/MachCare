import React, { useEffect, useState } from "react";
import axios from "axios";
import { getGlobalVariable } from "../../globalVariable";
import { getUserLocation } from "../helper/getLocation";
const Backend = getGlobalVariable();

function NeedHelp() {
  const [userData, setUserData] = useState(null);
  const [availableServices, setAvailableServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [location, setLocation] = useState(null);

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
        setLocation(data);
      })
      .catch((err) => console.log(err));

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

  // Handle checkbox change
  const handleCheckboxChange = (serviceName) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(serviceName)
        ? prevSelected.filter((name) => name !== serviceName)
        : [...prevSelected, serviceName]
    );
  };

  // Handle form submission
  const handleSubmit = async () => {
    console.log("Selected Services:", selectedServices);
    const res = await axios.post(
      `${Backend}/API/user/service/need/findMechanic`,
      { location, selectedServices },
      {
        headers: { token: localStorage.token },
      }
    );
    console.log(res);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
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
                  onChange={() => handleCheckboxChange(service.name)}
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

      {availableServices.length > 0 && (
        <button
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
        >
          Submit Selected
        </button>
      )}
    </div>
  );
}

export default NeedHelp;
