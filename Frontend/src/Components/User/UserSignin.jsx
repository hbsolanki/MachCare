import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getGlobalVariable } from "../../globalVariable";
import toast from "react-hot-toast"; // ✅ Import react-hot-toast

const Backend = getGlobalVariable();

const UserSignin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setErrors({});
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const res = await axios.post(`${Backend}/API/user/signin`, formData);

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        toast.success("Successfully Signed In!");
        navigate("/user");
      }
    } catch (error) {
      toast.error("Please check your credentials.");
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 sm:p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Sign In
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
              <label className="block text-gray-700 font-medium">
                Password
              </label>
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
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>

            {/* Forgot Password & Signup Links */}
            <div className="text-center text-sm text-gray-600 mt-4">
              <a href="/forgot-password" className="hover:text-blue-500">
                Forgot Password?
              </a>
              <span className="mx-2">|</span>
              <a href="/user/signup" className="hover:text-blue-500">
                Create an Account
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserSignin;
