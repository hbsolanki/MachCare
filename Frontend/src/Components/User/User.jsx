import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getGlobalVariable } from "../../globalVariable";
import UserHeader from "./UserHeader";
import GeneralModal from "../Utils/GeneralModel"; // Import modal

const Backend = getGlobalVariable();

function User() {
  let { token } = localStorage;
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${Backend}/API/user`, {
          headers: { token: token },
        });
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Handle delete vehicle
  const handleDeleteVehicle = async () => {
    if (!selectedVehicle) return;
    try {
      await axios.delete(`${Backend}/API/vehicles/${selectedVehicle._id}`, {
        headers: { token: token },
      });
      setUserData((prev) => ({
        ...prev,
        registered_vehicles: prev.registered_vehicles.filter(
          (v) => v._id !== selectedVehicle._id
        ),
      }));
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  return (
    <>
      {userData ? (
        <>
          <UserHeader />
          <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center p-6">
            <div className="w-full bg-gray-100 shadow-lg rounded-xl p-8 space-y-6">
              {/* User Info Card */}
              <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  User Information
                </h3>
                <p>
                  <strong>Name:</strong> {userData.name}
                </p>
                <p>
                  <strong>Email:</strong> {userData.email}
                </p>
                <p>
                  <strong>Phone:</strong> {userData.mobileNo}
                </p>
              </div>

              {/* Vehicles Section */}
              <div className="bg-white p-6 rounded-xl shadow border border-gray-200 w-full">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  Your Vehicles
                </h3>

                {userData?.registered_vehicles?.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-4 py-2">
                            Sr.
                          </th>
                          <th className="border border-gray-300 px-4 py-2">
                            Model
                          </th>
                          <th className="border border-gray-300 px-4 py-2">
                            Type
                          </th>
                          <th className="border border-gray-300 px-4 py-2">
                            Fuel Type
                          </th>
                          <th className="border border-gray-300 px-4 py-2">
                            Vehicle No.
                          </th>
                          <th className="border border-gray-300 px-4 py-2">
                            Year
                          </th>
                          <th className="border border-gray-300 px-4 py-2">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {userData.registered_vehicles.map((vehicle, index) => (
                          <tr
                            key={vehicle._id}
                            className="text-center hover:bg-gray-50"
                          >
                            <td className="border border-gray-300 px-4 py-2">
                              {index + 1}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 font-semibold">
                              {vehicle.model}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {vehicle.type}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {vehicle.fuelType.toUpperCase()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {vehicle.vehicleNo}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {vehicle.manufacturingYear || "N/A"}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              <button
                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md mr-2"
                                onClick={() =>
                                  navigate(`/user/vehicle/edit/${vehicle._id}`)
                                }
                              >
                                Edit
                              </button>
                              <button
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                                onClick={() => {
                                  setSelectedVehicle(vehicle);
                                  setIsModalOpen(true);
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500">No vehicles registered yet.</p>
                )}
              </div>

              {/* Buttons in One Row */}
              <div className="mt-6 flex flex-col sm:flex-row sm:gap-4">
                <Link
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition text-center"
                  to="/user/service/need"
                >
                  Need Help?
                </Link>
                <Link
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition text-center"
                  to="/user/vehicle/new"
                >
                  Add Vehicle
                </Link>
                <Link
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg transition text-center"
                  to="/user/profile/edit"
                >
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>

          {/* General Modal for Deleting Vehicle */}
          <GeneralModal
            open={isModalOpen}
            setOpen={setIsModalOpen}
            title="Delete Vehicle"
            message={`Are you sure you want to delete ${selectedVehicle?.model}?`}
            onConfirm={handleDeleteVehicle}
            confirmText="Delete"
            cancelText="Cancel"
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default User;
