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
  const [newService, setNewService] = useState("");
  const [editedServices, setEditedServices] = useState([]);

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
        setEditedServices(response.data.provide_services);
      } catch (error) {
        console.error("Error fetching mechanic data:", error);
        setError("Failed to load mechanic details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMechanicData();
  }, [token, navigate]);

  const handleAddService = () => {
    if (!newService.trim()) return;
    setEditedServices([...editedServices, newService]);
    setNewService("");
  };

  const handleEditService = (index, value) => {
    const updatedServices = [...editedServices];
    updatedServices[index] = value;
    setEditedServices(updatedServices);
  };

  const handleDeleteService = (index) => {
    setEditedServices(editedServices.filter((_, i) => i !== index));
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
          {editedServices.map((service, index) => (
            <div
              key={index}
              className="bg-gray-200 p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <input
                type="text"
                value={service}
                onChange={(e) => handleEditService(index, e.target.value)}
                className="bg-transparent border-none focus:outline-none flex-1"
              />
              <button
                onClick={() => handleDeleteService(index)}
                className="text-red-500"
              >
                <Trash className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex mt-4 gap-2">
          <input
            type="text"
            value={newService}
            onChange={(e) => setNewService(e.target.value)}
            className="border p-2 rounded-lg flex-1"
            placeholder="Add new service"
          />
          <button
            onClick={handleAddService}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg"
          >
            <Plus className="h-5 w-5" />
          </button>
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
