import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function UserRegistration() {
  const {
    register,
    handleSubmit,
    formState: { errors,isSubmitting },
  } = useForm();

  const addNewUser = async (data) => {
    try {
      const res = await axios.post("http://localhost:8080/user/new",data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
          Register New User
        </h2>
        <form onSubmit={handleSubmit(addNewUser)} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              &nbsp; Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="enter your name"
              {...register("name", { required: "name is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
               &nbsp;Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="enter email address like hello@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  // regex to validate email pattern
                  value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                }
              })}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="mobileNo"
              className="block text-sm font-medium text-gray-700"
            >
               &nbsp;Mobile no
            </label>
            <input
              type="String"
              id="mobileNo"
              placeholder="enter mobile number"
              {...register("mobileNo", {
                required: "mobile number is required",
                pattern: {
                  // regex to validate mobile number
                  value: /^\d{10}$/,
                  message: "mobile number must be of 10 digits",
                },
              })}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
            />
            {errors.mobileNo && (
              <p className="text-red-500 text-sm mt-1">
                {errors.mobileNo.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
               &nbsp;Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                  message:
                    "Password must be at least 8 characters long and include a number and special character",
                },
              })}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            {isSubmitting ? "Submitting...." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserRegistration;
