import React from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import axios from "axios";

function ProfileEdit() {
  useEffect(() => {
    try {
      const fetchData = async () => {
        const formData = await axios.get("http://localhost:8080/user/update", {
          withCredentials: true,
        });
        console.log(formData.data);
      };

      fetchData();
    } catch (error) {
        console.log(error);
    }
  },[]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const updatingProfile = (data) => {
    console.log("hi i am in the form submission");
  };

  return (
    <>
      <form onSubmit={handleSubmit(updatingProfile)}>
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
        <input type="submit" />
      </form>
    </>
  );
}

export default ProfileEdit;
