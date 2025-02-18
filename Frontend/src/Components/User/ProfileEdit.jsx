import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProfileEdit() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const formData = await axios.get("http://localhost:8080/user/update", {
          withCredentials: true,
        });
        formData.data.password = "";
        reset(formData.data);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const updatingProfile = async (data) => {
    const result = await axios.post("http://localhost:8080/user/update", data,{
      withCredentials: false,
    })
    if(result.status === 200) {
        navigate("/");
    }
    else{
      console.log("error while updating profile");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(updatingProfile)}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Edit Profile</h2>
        
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="mobileNo" className="block text-sm font-medium text-gray-600">Mobile No</label>
          <input
            type="text"
            id="mobileNo"
            placeholder="Enter mobile number"
            {...register("mobileNo", {
              required: "Mobile number is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Mobile number must be 10 digits",
              },
            })}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
          />
          {errors.mobileNo && <p className="text-red-500 text-sm mt-1">{errors.mobileNo.message}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                message: "Must be at least 8 characters, include a number & special character",
              },
            })}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
        
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          {isSubmitting ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}

export default ProfileEdit;
