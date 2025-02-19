import React, { useState, useEffect } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { getGlobalVariable } from "../../globalVariable";
import UserHeader from "./UserHeader";
import GeneralModal from "../Utils/GeneralModel";
import PlanCard from "../Utils/PlanCard";

import { Bell, LogOut, Edit } from "lucide-react";

const Backend = getGlobalVariable();

function User() {
  let { token } = localStorage;
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [planData, setPlanData] = useState([]);

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${Backend}/API/user`, {
          headers: { token: token },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchPlanData = async () => {
      try {
        const response = await axios.get(`${Backend}/API/plan`);
        setPlanData(response.data || []);
      } catch (error) {
        console.error("Error fetching plan data:", error);
      }
    };

    fetchUserData();
    fetchPlanData();
  }, [token]); // Added dependency for re-fetching when the token changes

  const handleBuyPlan = async (pid) => {
    try {
      let res = await axios.put(
        `${Backend}/API/user/plan/buy/${pid}`, // URL
        {}, // Empty body (PUT request needs a second argument)
        {
          headers: {
            token: localStorage.token, // Correct placement of headers
          },
        }
      );

      console.log("Plan purchased:", res.data);
      // Instead of reload, update state if necessary
      // setUserData((prev) => ({ ...prev, plan: res.data.plan }));
      navigate(0); // Redirect to a success page
    } catch (err) {
      console.error("Error buying plan:", err.response?.data || err.message);
    }
  };

  // Handle delete vehicle
  const handleDeleteVehicle = async () => {
    if (!selectedVehicle) return;
    try {
      await axios.delete(
        `${Backend}/API/user/vehicle/delete/${selectedVehicle._id}`,
        { headers: { token: token } }
      );
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

              {userData.plan.length > 0 ? (
                <>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    Active Plan
                  </h3>
                  {userData.plan.map((plan) => (
                    <div
                      key={plan._id}
                      className="bg-white p-4 rounded-lg shadow flex flex-col h-full"
                    >
                      {/* Make PlanCard take full available space */}
                      <div className="flex-grow">
                        <PlanCard
                          title={plan.name}
                          duration={plan.duration}
                          price={`${plan.price}`}
                          services={plan.services}
                        />
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <></>
              )}

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

              {/* Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row sm:gap-4">
                {userData.plan.length > 0 && (
                  <Link
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition text-center"
                    to="/user/service/need"
                  >
                    Need Help?
                  </Link>
                )}
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
          <>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Explore Other Plan
              </h3>
            </div>
            {planData.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 border">
                {planData.map((plan) => (
                  <div
                    key={plan._id}
                    className="bg-white p-4 rounded-lg shadow flex flex-col h-full"
                  >
                    {/* Make PlanCard take full available space */}
                    <div className="flex-grow">
                      <PlanCard
                        title={plan.name}
                        duration={plan.duration}
                        price={`${plan.price}`}
                        services={plan.services}
                      />
                    </div>

                    {/* Align button at the bottom */}
                    <button
                      className="block mt-auto text-center bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                      onClick={() => handleBuyPlan(plan._id)}
                    >
                      Choose Plan
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic text-center">
                No plans available.
              </p>
            )}
          </>

          <GeneralModal
            open={isModalOpen}
            setOpen={setIsModalOpen}
            title="Delete Vehicle"
            message={`Are you sure you want to delete ${selectedVehicle?.model}?`}
            onConfirm={handleDeleteVehicle}
          />
        </>
      ) : null}
    </>
  );
}

export default User;
