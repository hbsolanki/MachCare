import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import GeneralModal from "../Utils/GeneralModel";
import axios from "axios";
import { getGlobalVariable } from "../../globalVariable";
import { Bell, LogOut, Edit } from "lucide-react"; // Icons for better UI

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
        navigate("/"); // Redirect if no token
        return;
      }

      console.log(token);

      try {
        const response = await axios.get(`${Backend}/API/mechanic`, {
          headers: { token },
        });
        console.log(response);
        setMechanicData(response.data);
      } catch (error) {
        console.error("Error fetching mechanic data:", error);
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 text-black">
      <div className="w-full bg-white shadow-lg rounded-xl p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          {/* Notification Bell */}
          <button
            className="relative bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-6 w-6 text-gray-700" />
            {mechanicData.notification.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 rounded-full">
                {mechanicData.notification.length}
              </span>
            )}
          </button>

          {/* Logout Button */}
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
          >
            <LogOut className="h-5 w-5" /> Logout
          </button>
        </div>

        {/* Notification List */}
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

        {/* Mechanic Details */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 mt-4">
          <p>
            <strong>Name:</strong> {mechanicData.name}
          </p>
          <p>
            <strong>Email:</strong> {mechanicData.email}
          </p>
          <p>
            <strong>Phone:</strong> {mechanicData.mobileNo}
          </p>
          <p>
            <strong>Availability:</strong>{" "}
            <span
              className={`font-semibold ${
                mechanicData.isAvailable ? "text-green-600" : "text-red-600"
              }`}
            >
              {mechanicData.isAvailable ? "Available" : "Unavailable"}
            </span>
          </p>
          <button
            onClick={toggleAvailability}
            className={`mt-3 px-3 py-1 text-sm rounded-lg text-white transition ${
              mechanicData.isAvailable
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {mechanicData.isAvailable ? "Set Unavailable" : "Set Available"}
          </button>
        </div>

        {/* Services Section */}
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
                <span className="text-gray-800 font-medium">{service}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Profile & Manage Services Buttons */}
        <div className="mt-6 flex gap-3">
          <Link
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 text-sm rounded-lg transition"
            to="/mechanic/profile/edit"
          >
            <Edit className="h-4 w-4 inline-block" /> Edit Profile
          </Link>
          <Link
            className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-2 text-sm rounded-lg transition"
            to="/mechanic/services"
          >
            Manage Services
          </Link>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
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
  );
}

export default Mechanical;
