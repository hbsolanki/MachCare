import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { getGlobalVariable } from "../../globalVariable";
const Backend = getGlobalVariable();

const Signin = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = async (data) => {
    try {
      const res = await axios.post(`${Backend}/API/signup`, data, {
        withCredentials: true, // Ensures cookies are sent and received
      });

      if (res.status === 201) {
        alert("Signup successful!");
        navigate("/"); // Redirect to homepage after signup
      }
    } catch (error) {
      if (error.response) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("Network error or server unreachable");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit(login)} className="space-y-5">
          {/* Role Selection */}
          <div>
            <label className="block text-gray-700 font-medium">Role</label>
            <select
              {...register("role", { required: "Please select a role" })}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="user">User</option>
              <option value="mechanic">Mechanic</option>
              <option value="dealer">Dealer</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
          </div>

          {/* Username Field */}
          <div>
            <label className="block text-gray-700 font-medium">Username</label>
            <input
              {...register("username", { required: "Username is required" })}
              type="text"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                },
              })}
              type="email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                  message:
                    "Must include 8+ characters, a number, and a special character",
                },
              })}
              type="password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>

          {/* Forgot Password & Signup Links */}
          <div className="text-center text-sm text-gray-600 mt-4">
            <a href="/forgot-password" className="hover:text-blue-500">
              Forgot Password?
            </a>
            <span className="mx-2">|</span>
            <a href="/signup" className="hover:text-blue-500">
              Create an Account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
