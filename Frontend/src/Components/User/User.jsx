import React, { useState, useEffect } from "react";
import axios from "axios";
import { getGlobalVariable } from "../../globalVariable";
import { useNavigate } from "react-router-dom";
import UserHeader from "./UserHeader";
import GeneralModal from "../User/../Utils/GeneralModel";
import UserInfoCard from "./UserMain/UserInfoCard";
import ActivePlanSection from "./UserMain/ActivePlanSection";
import VehiclesSection from "./UserMain/VehiclesSection";
import ExploreOtherPlansSection from "./UserMain/ExploreOtherPlansSection";
import ButtonsSection from "./UserMain/ButtonsSection";

const Backend = getGlobalVariable();

function User() {
  let { token } = localStorage;
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [planData, setPlanData] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${Backend}/API/user`, {
          headers: { token: token },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchPlanData = async () => {
      try {
        const response = await axios.get(`${Backend}/API/plan`);
        setPlanData(response.data || []);
      } catch (error) {
        console.error("Error fetching plan data:", error);
      }
    };

    fetchUserData();
    fetchPlanData();
  }, [token]);

  const handleBuyPlan = async (pid) => {
    try {
      await axios.put(
        `${Backend}/API/user/plan/buy/${pid}`,
        {},
        {
          headers: { token: localStorage.token },
        }
      );
      navigate(0); // Redirect after purchasing
    } catch (err) {
      console.error("Error buying plan:", err.response?.data || err.message);
    }
  };

  const handleDeleteVehicle = async () => {
    if (!selectedVehicle) return;
    try {
      await axios.delete(
        `${Backend}/API/user/vehicle/delete/${selectedVehicle._id}`,
        { headers: { token: token } }
      );
      setUserData((prev) => ({
        ...prev,
        registered_vehicles: prev.registered_vehicles.filter(
          (v) => v._id !== selectedVehicle._id
        ),
      }));
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  return (
    <>
      {userData ? (
        <>
          <UserHeader />
          <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center p-4">
            <div className="w-full bg-gray-100 shadow-lg rounded-xl p-8 space-y-6">
              <UserInfoCard userData={userData} />

              <ActivePlanSection userData={userData} />
              <VehiclesSection
                userData={userData}
                setIsModalOpen={setIsModalOpen}
                setSelectedVehicle={setSelectedVehicle}
              />
              {/* <ButtonsSection userData={userData} /> */}
              <ExploreOtherPlansSection
                planData={planData}
                handleBuyPlan={handleBuyPlan}
              />
            </div>

            <GeneralModal
              open={isModalOpen}
              setOpen={setIsModalOpen}
              title="Delete Vehicle"
              message={`Are you sure you want to delete ${selectedVehicle?.model}?`}
              onConfirm={handleDeleteVehicle}
            />
          </div>
        </>
      ) : null}
    </>
  );
}

export default User;
