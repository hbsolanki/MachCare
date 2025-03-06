import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getGlobalVariable } from "../../globalVariable";
import { Plus, Trash, Save, X } from "lucide-react";

const Backend = getGlobalVariable();

function ManageService() {
  const navigate = useNavigate();
  const [mechanicData, setMechanicData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editedServices, setEditedServices] = useState([]);
  const [allService, setAllService] = useState([]);

  const token = localStorage.getItem("mtoken");

  useEffect(() => {
    const fetchMechanicData = async () => {
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const response = await axios.get(`${Backend}/API/mechanic`, {
          headers: { token },
        });
        setMechanicData(response.data);
        setEditedServices(
          response.data.provide_services.map((service) => service._id)
        );
      } catch (error) {
        console.error("Error fetching mechanic data:", error);
        setError("Failed to load mechanic details.");
      } finally {
        setLoading(false);
      }
    };

    const fetchServiceData = async () => {
      try {
        const response = await axios.get(`${Backend}/API/service`, {
          headers: { token },
        });
        setAllService(response.data);
      } catch (error) {
        console.error("Error fetching service data:", error);
        setError("Failed to load service details.");
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
    fetchMechanicData();
  }, [token, navigate]);

  const handleToggleService = (serviceId) => {
    setEditedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `${Backend}/API/mechanic/service/update`,
        { services: editedServices },
        { headers: { token } }
      );
      navigate(-1);
    } catch (error) {
      console.error("Error updating services:", error);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 text-black">
      <div className="w-full bg-white shadow-lg rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800">Manage Services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {allService.map((service) => (
            <label
              key={service._id}
              className="bg-gray-200 p-4 rounded-lg shadow-md flex flex-col cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editedServices.includes(service._id)}
                  onChange={() => handleToggleService(service._id)}
                  className="h-5 w-5"
                />
                <span className="font-semibold">{service.name}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {service.description}
              </p>
              <p className="text-sm text-gray-700 font-semibold">
                Price: ₹{service.price}
              </p>
              <p className="text-sm text-gray-500">Range: {service.range} km</p>
            </label>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Save className="h-5 w-5" /> Save
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <X className="h-5 w-5" /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManageService;
