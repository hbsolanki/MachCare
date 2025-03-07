import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import GeneralModal from "../Utils/GeneralModel";
import axios from "axios";
import { getGlobalVariable } from "../../globalVariable";
import { Bell, LogOut, Edit, RefreshCcw } from "lucide-react"; // Icons for better UI

import { FaUser } from "react-icons/fa";
import MechanicHeader from "./MechanicHeader";

const Backend = getGlobalVariable();

function Mechanical() {
  const navigate = useNavigate();
  const [mechanicData, setMechanicData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const token = localStorage.getItem("mtoken");

  useEffect(() => {
    const fetchMechanicData = async () => {
      if (!token) {
        navigate("/");
        return;
      }
      try {
        const response = await axios.get(`${Backend}/API/mechanic`, {
          headers: { token },
        });
        setMechanicData(response.data);
      } catch (error) {
        setError("Failed to load mechanic details.");
      } finally {
        setLoading(false);
      }
    };
    fetchMechanicData();
  }, [token, navigate]);

  const toggleAvailability = async () => {
    try {
      await axios.put(
        `${Backend}/API/mechanic/updateAvailability`,
        { isAvailable: !mechanicData.isAvailable },
        { headers: { token } }
      );
      setMechanicData({
        ...mechanicData,
        isAvailable: !mechanicData.isAvailable,
      });
    } catch (error) {
      console.error("Error updating availability:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      <MechanicHeader mechanicData={mechanicData} />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 text-black">
        <div className="w-full bg-white shadow-lg rounded-xl p-6">
          {showNotifications && (
            <div className="bg-gray-100 p-3 mt-2 rounded-md border border-gray-300">
              {mechanicData.notification.length > 0 ? (
                mechanicData.notification.map((notif, index) => (
                  <p key={index} className="text-gray-700">
                    {notif}
                  </p>
                ))
              ) : (
                <p className="text-gray-500">No notifications</p>
              )}
            </div>
          )}

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold flex items-center mb-2">
                <FaUser className="mr-2 text-blue-500" />
                Mechanic Information
              </h3>
              <Link
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 text-sm rounded-lg transition flex items-center gap-1"
                to="/mechanic/profile/edit"
              >
                <Edit className="h-4 w-4" /> Edit Profile
              </Link>
            </div>
            <p>
              <strong>Name:</strong> {mechanicData.name}
            </p>
            <p>
              <strong>Email:</strong> {mechanicData.email}
            </p>
            <p>
              <strong>Phone:</strong> {mechanicData.mobileNo}
            </p>
            <p className="flex">
              <strong>Availability: </strong>{" "}
              <span
                className={`font-semibold ${
                  mechanicData.isAvailable ? "text-green-600" : "text-red-600"
                } flex items-center gap-2`}
              >
                {mechanicData.isAvailable ? " Available" : " Unavailable"}
                <button
                  onClick={toggleAvailability}
                  className="ml-2 text-blue-600 hover:text-blue-800 flex items-center gap-1 transition"
                >
                  <RefreshCcw className="h-4 w-4" /> Change
                </button>
              </span>
            </p>
          </div>

          <div className="w-full bg-white shadow-lg rounded-xl p-6 mt-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Services Provided
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {mechanicData.provide_services.map((service, index) => (
                <div
                  key={index}
                  className="bg-gray-200 p-4 rounded-lg shadow-md text-center"
                >
                  <span className="text-gray-800 font-medium">
                    {service.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <GeneralModal
          open={isLogoutModalOpen}
          setOpen={setIsLogoutModalOpen}
          title="Logout"
          message="Are you sure you want to log out?"
          onConfirm={handleLogout}
          confirmText="Logout"
          cancelText="Cancel"
        />
      </div>
    </>
  );
}

export default Mechanical;
