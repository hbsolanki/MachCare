import React, { useState } from "react";
import axios from "axios";
import { getGlobalVariable } from "../../globalVariable";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Backend = getGlobalVariable();

function UserSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      errors.email = "Invalid email format";
    }
    if (!formData.mobileNo) {
      errors.mobileNo = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobileNo)) {
      errors.mobileNo = "Mobile number must be 10 digits";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (
      !/^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(
        formData.password
      )
    ) {
      errors.password =
        "Must be 8+ chars, include a number & special character";
    }
    return errors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);

    try {
      const res = await axios.post(`${Backend}/API/user/signup`, formData);

      localStorage.setItem("token", res.data.token);
      toast.success("Successfully Registered! ");
      navigate("/user");
    } catch (error) {
      console.error("Signup Error:", error);

      if (error.response && error.response.status === 400) {
        toast.error("Email already exists! ");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <Toaster />
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 sm:p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Register New User
          </h2>
          <form onSubmit={handleFormSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Mobile No
              </label>
              <input
                type="text"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                placeholder="Enter your mobile number"
              />
              {errors.mobileNo && (
                <p className="text-red-500 text-sm">{errors.mobileNo}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              {isSubmitting ? "Submitting..." : "Register"}
            </button>
          </form>
          <div className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <a href="/user/signin" className="text-blue-500 hover:underline">
              Sign in
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserSignup;
