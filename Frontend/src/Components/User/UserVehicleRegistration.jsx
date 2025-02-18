import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { getGlobalVariable } from "../../globalVariable";
const Backend = getGlobalVariable();

function UserVehicleRegistration() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const addNewVehicle = async (data) => {
    try {
      const res = await axios.post(`${Backend}/API/user/vehicle/new`, data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-blue-200 p-10 rounded-lg shadow-md mt-10">
      <h2 className="text-xl font-bold text-gray-700 mb-4">
        Vehicle Registration
      </h2>

      <form onSubmit={handleSubmit(addNewVehicle)} className="space-y-4">
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            Type of Vehicle
          </label>
          <select
            id="type"
            {...register("type", { required: "Please select type of vehicle" })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="bike">Bike</option>
            <option value="car">Car</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="fuelType"
            className="block text-sm font-medium text-gray-700"
          >
            Type of Fuel
          </label>
          <select
            id="fuelType"
            {...register("fuelType", {
              required: "Please select type of fuel",
            })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="ev">EV</option>
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
            <option value="CNG">CNG</option>
          </select>
          {errors.fuelType && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fuelType.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="model"
            className="block text-sm font-medium text-gray-700"
          >
            Vehicle Model
          </label>
          <input
            id="model"
            type="text"
            placeholder="enter vehicle model"
            {...register("model", { required: "Please enter a vehicle model" })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.model && (
            <p className="text-red-500 text-sm mt-1">{errors.model.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="vehicleNo"
            className="block text-sm font-medium text-gray-700"
          >
            Vehicle Number
          </label>
          <input
            id="vehicleNo"
            type="text"
            placeholder="enter like MH 12 AB 1234"
            {...register("vehicleNo", {
              required: "Please enter vehicle number",
              pattern: {
                // regex to validate vehicle number
                value: /^[A-Z]{2}\s?\d{2}\s?[A-Z]{1,2}\s?\d{4}$/,
                message: "enter valid vehicle number",
              },
            })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.vehicleNo && (
            <p className="text-red-500 text-sm mt-1">
              {errors.vehicleNo.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="manufacturingYear"
            className="block text-sm font-medium text-gray-700"
          >
            Manufacturing Year
          </label>
          <input
            id="manufacturingYear"
            type="number"
            {...register("manufacturingYear", {
              required: "Please enter manufacturing year",
            })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.manufacturingYear && (
            <p className="text-red-500 text-sm mt-1">
              {errors.manufacturingYear.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default UserVehicleRegistration;
