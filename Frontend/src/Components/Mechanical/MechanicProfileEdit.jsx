import React, { useEffect, useState } from "react";
import axios from "axios";
import { getGlobalVariable } from "../../globalVariable";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { getUserLocation } from "../helper/getLocation";

function MechanicProfileEdit() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    password: "",
    latitude: "",
    longitude: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("mtoken"));
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchMechanicData = async () => {
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const response = await axios.get(
          `${getGlobalVariable("Backend")}/API/mechanic`,
          { headers: { token } }
        );

        const { location } = response.data;
        console.log(response.data);
        setFormData({
          ...response.data,
          latitude: location?.coordinates[1] || "",
          longitude: location?.coordinates[0] || "",
        });
      } catch (error) {
        console.error("Error fetching mechanic data:", error);
        setErrors({ fetch: "Failed to load mechanic details." });
      } finally {
        setLoading(false);
      }
    };

    fetchMechanicData();
  }, [token, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSetLocation = () => {
    getUserLocation()
      .then((data) => {
        console.log("Location:", data);
        setFormData((prevData) => ({
          ...prevData,
          latitude: data.latitude,
          longitude: data.longitude,
        }));
      })
      .catch((error) => {
        console.error("Error fetching location:", error);
        alert("Failed to get location. Please allow location access.");
      });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      const backendUrl = getGlobalVariable("Backend");

      const updateData = {
        ...formData,
        location: {
          type: "Point",
          coordinates: [
            parseFloat(formData.longitude),
            parseFloat(formData.latitude),
          ],
        },
      };

      await axios.put(`${backendUrl}/API/mechanic/profile/update`, updateData, {
        headers: { token },
      });

      alert("Profile updated successfully!");
      navigate("/mechanic");
    } catch (error) {
      console.error("Update Error:", error);
      alert("Profile update failed. Please try again.");
    }
    setIsSubmitting(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Edit Mechanic Profile
        </h2>
        <form onSubmit={handleFormSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Mobile No</label>
            <input
              type="text"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Enter your mobile number"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Latitude</label>
            <input
              type="text"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Latitude"
              readOnly
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Longitude</label>
            <input
              type="text"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Longitude"
              readOnly
            />
          </div>

          <button
            type="button"
            onClick={handleSetLocation}
            className="w-full bg-green-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-300"
          >
            Set Location
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            {isSubmitting ? "Submitting..." : "Update Profile"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600 mt-4">
          <a href="/mechanic" className="text-blue-500 hover:underline">
            Back to Profile
          </a>
        </div>
      </div>
    </div>
  );
}

export default MechanicProfileEdit;
