import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getGlobalVariable } from "../../globalVariable";

const Backend = getGlobalVariable();

function VehicleEdit() {
  const { vid } = useParams();
  const navigate = useNavigate();
  const [vehicleType, setVehicleType] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    async function fetchVehicle() {
      try {
        const response = await axios.get(
          `${Backend}/API/user/vehicle/data/${vid}`,
          {
            headers: { token: localStorage.token },
          }
        );

        const vehicle = response.data;
        reset(vehicle);
        setVehicleType(vehicle.type || ""); // ✅ Ensure vehicleType updates after reset

        console.log("Fetched vehicle:", vehicle); // Debugging log
      } catch (error) {
        console.error("Failed to fetch vehicle details", error);
        alert("Error fetching vehicle details");
      }
    }
    fetchVehicle();
  }, [vid, reset]);

  const updateVehicle = async (data) => {
    try {
      await axios.put(`${Backend}/API/user/vehicle/update/${vid}`, data, {
        headers: { token: localStorage.token },
      });
      navigate("/user");
    } catch (error) {
      console.error(error);
      alert("Vehicle update failed. Please try again.");
    }
  };

  const fuelOptions = {
    bike: ["ev", "petrol", "CNG"],
    car: ["ev", "petrol", "diesel", "CNG"],
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Edit Vehicle Details
        </h2>
        <form onSubmit={handleSubmit(updateVehicle)} className="space-y-5">
          {/* Vehicle Type */}
          <div>
            <label className="block text-gray-700 font-medium">
              Type of Vehicle
            </label>
            <select
              {...register("type", {
                required: "Please select type of vehicle",
              })}
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value);
                setValue("fuelType", ""); // ✅ Reset fuelType when vehicleType changes
              }}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            >
              <option value="">Select Vehicle Type</option>
              <option value="bike">Bike</option>
              <option value="car">Car</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm">{errors.type.message}</p>
            )}
          </div>

          {/* Fuel Type */}
          <div>
            <label className="block text-gray-700 font-medium">
              Type of Fuel
            </label>
            <select
              {...register("fuelType", {
                required: "Please select type of fuel",
              })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              disabled={!vehicleType || !fuelOptions[vehicleType]}
            >
              <option value="">Select Fuel Type</option>
              {fuelOptions[vehicleType]?.map((fuel) => (
                <option key={fuel} value={fuel}>
                  {fuel.toUpperCase()}
                </option>
              ))}
            </select>
            {errors.fuelType && (
              <p className="text-red-500 text-sm">{errors.fuelType.message}</p>
            )}
          </div>

          {/* Vehicle Model */}
          <div>
            <label className="block text-gray-700 font-medium">
              Vehicle Model
            </label>
            <input
              type="text"
              {...register("model", {
                required: "Please enter a vehicle model",
              })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Enter vehicle model"
            />
            {errors.model && (
              <p className="text-red-500 text-sm">{errors.model.message}</p>
            )}
          </div>

          {/* Manufacturing Year */}
          <div>
            <label className="block text-gray-700 font-medium">
              Manufacturing Year
            </label>
            <input
              type="number"
              {...register("manufacturingYear", {
                required: "Please enter manufacturing year",
              })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Enter manufacturing year"
            />
            {errors.manufacturingYear && (
              <p className="text-red-500 text-sm">
                {errors.manufacturingYear.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Vehicle"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default VehicleEdit;
