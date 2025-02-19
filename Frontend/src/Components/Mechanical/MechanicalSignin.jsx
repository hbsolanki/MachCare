import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getGlobalVariable } from "../../globalVariable";

const Backend = getGlobalVariable();

const MechanicalSignin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      tempErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (
      !/^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(
        formData.password
      )
    ) {
      tempErrors.password =
        "Must include 8+ characters, a number, and a special character";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await axios.post(`${Backend}/API/mechanic/signin`, formData);
      localStorage.setItem("mtoken", res.data.token);
      console.log(res);
      navigate("/mechanic");
    } catch (error) {
      console.error(error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Mechanic Signin
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Signin
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

export default MechanicalSignin;
