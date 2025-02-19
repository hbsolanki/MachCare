import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getGlobalVariable } from "../../globalVariable";

const Backend = getGlobalVariable();

function User() {
  const [userData, setUserData] = useState(null);

  const hardcodedUser = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+91 9876543210",
    purchasedPlans: [
      { id: 1, name: "Basic Service", price: "₹999", status: "Active" },
      { id: 2, name: "Premium Maintenance", price: "₹2999", status: "Expired" },
    ],
    vehicles: [{ id: 1, model: "Honda City", number: "GJ 05 AB 1234" }],
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${Backend}/API/user`, {
          withCredentials: true,
        });
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Merge hardcoded and fetched data, giving priority to fetched data
  const finalUserData = hardcodedUser;

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center p-6">
      <div className="max-w-5xl w-full bg-gray-100 shadow-lg rounded-xl p-8 space-y-6">
        {/* User Info Card */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            User Information
          </h3>
          <p>
            <strong>Name:</strong> {finalUserData.name}
          </p>
          <p>
            <strong>Email:</strong> {finalUserData.email}
          </p>
          <p>
            <strong>Phone:</strong> {finalUserData.phone}
          </p>
        </div>

        {/* Purchased Plans */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            Purchased Plans
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {finalUserData.purchasedPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-gray-50 p-4 rounded-lg shadow border border-gray-300"
              >
                <p className="font-bold">{plan.name}</p>
                <p>{plan.price}</p>
                <p
                  className={
                    plan.status === "Active" ? "text-green-600" : "text-red-500"
                  }
                >
                  {plan.status}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Vehicles Section */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            Your Vehicles
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {finalUserData.vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-gray-50 p-4 rounded-lg shadow border border-gray-300"
              >
                <p className="font-bold">{vehicle.model}</p>
                <p>{vehicle.number}</p>
              </div>
            ))}
          </div>
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
  );
}

export default User;
