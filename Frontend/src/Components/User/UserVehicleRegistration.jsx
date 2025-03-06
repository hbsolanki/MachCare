import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getGlobalVariable } from "../../globalVariable";

const Backend = getGlobalVariable();

function UserVehicleRegistration() {
  const navigate = useNavigate();
  const [vehicleType, setVehicleType] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const addNewVehicle = async (data) => {
    try {
      const formattedVehicleNo = `${data.stateCode} ${data.rtoCode} ${data.alphabets} ${data.digits}`;
      const updatedData = { ...data, vehicleNo: formattedVehicleNo };
      delete updatedData.stateCode;
      delete updatedData.rtoCode;
      delete updatedData.alphabets;
      delete updatedData.digits;

      await axios.post(`${Backend}/API/user/vehicle/new`, updatedData, {
        headers: {
          token: localStorage.token,
        },
      });
      navigate("/user");
    } catch (error) {
      console.log(error);
      alert("Vehicle registration failed. Please try again.");
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
          Vehicle Registration
        </h2>
        <form onSubmit={handleSubmit(addNewVehicle)} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium">
              Type of Vehicle
            </label>
            <select
              {...register("type", {
                required: "Please select type of vehicle",
              })}
              onChange={(e) => setVehicleType(e.target.value)}
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

          <div>
            <label className="block text-gray-700 font-medium">
              Type of Fuel
            </label>
            <select
              {...register("fuelType", {
                required: "Please select type of fuel",
              })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              disabled={!vehicleType}
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

          <div>
            <label className="block text-gray-700 font-medium">
              Vehicle Number
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                {...register("stateCode", {
                  required: "Enter state code",
                  pattern: {
                    value: /^[A-Z]{2}$/,
                    message: "2 uppercase letters",
                  },
                })}
                className="w-1/4 p-3 border rounded-lg text-center"
                placeholder="GJ"
                maxLength={2}
              />
              <input
                type="text"
                {...register("rtoCode", {
                  required: "Enter RTO code",
                  pattern: { value: /^\d{2}$/, message: "2 digits required" },
                })}
                className="w-1/4 p-3 border rounded-lg text-center"
                placeholder="01"
                maxLength={2}
              />
              <input
                type="text"
                {...register("alphabets", {
                  required: "Enter alphabets",
                  pattern: {
                    value: /^[A-Z]{1,2}$/,
                    message: "1-2 uppercase letters",
                  },
                })}
                className="w-1/4 p-3 border rounded-lg text-center"
                placeholder="HM"
                maxLength={3}
              />
              <input
                type="text"
                {...register("digits", {
                  required: "Enter last 4 digits",
                  pattern: { value: /^\d{4}$/, message: "4 digits required" },
                })}
                className="w-1/4 p-3 border rounded-lg text-center"
                placeholder="3030"
                maxLength={4}
              />
            </div>
            {errors.stateCode && (
              <p className="text-red-500 text-sm">{errors.stateCode.message}</p>
            )}
            {errors.rtoCode && (
              <p className="text-red-500 text-sm">{errors.rtoCode.message}</p>
            )}
            {errors.alphabets && (
              <p className="text-red-500 text-sm">{errors.alphabets.message}</p>
            )}
            {errors.digits && (
              <p className="text-red-500 text-sm">{errors.digits.message}</p>
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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Register Vehicle"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserVehicleRegistration;
