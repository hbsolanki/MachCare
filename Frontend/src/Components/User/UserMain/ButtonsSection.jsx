import { Link } from "react-router-dom";
import ExploreOtherPlansSection from "./ExploreOtherPlansSection"; // Make sure this is correctly imported

const ButtonsSection = ({ userData, planData, handleBuyPlan }) => (
  <div className="mt-6 space-y-6">
    {/* Buttons Section */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {userData.plan.length > 0 && (
        <Link
          className="flex items-center justify-center bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-500 text-white py-3 px-6 rounded-xl shadow-md transition-all transform hover:scale-105 text-center"
          to="/user/service/need"
        >
          Need Help?
        </Link>
      )}
      <Link
        className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl shadow-md transition-all transform hover:scale-105 text-center"
        to="/user/vehicle/new"
      >
        Add Vehicle
      </Link>
      <Link
        className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-xl shadow-md transition-all transform hover:scale-105 text-center"
        to="/user/profile/edit"
      >
        Edit Profile
      </Link>
    </div>

    {/* Show "Explore Other Plan" if no active plans */}
    {userData.plan.length === 0 && (
      <ExploreOtherPlansSection
        planData={planData}
        handleBuyPlan={handleBuyPlan}
      />
    )}
  </div>
);

export default ButtonsSection;
