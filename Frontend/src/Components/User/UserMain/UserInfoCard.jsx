import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

import { Edit } from "lucide-react";

const UserInfoCard = ({ userData }) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
    {/* Header and Edit Profile Button in One Row */}
    <div className="flex justify-between items-center mb-6">
      <h3 className="flex items-center text-xl font-semibold text-gray-800">
        <FaUser className="mr-2 text-blue-500" /> {/* Icon */}
        User Information
      </h3>
      <Link
        className="flex items-center bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-lg shadow-md transition-all transform hover:scale-105"
        to="/user/profile/edit"
      >
        <Edit size={16} className="mr-2" />{" "}
        {/* Adding margin-right for spacing between the icon and text */}
        Edit Profile
      </Link>
    </div>

    {/* User Information */}
    <p className="text-gray-700">
      <strong>Name:</strong> {userData.name}
    </p>
    <p className="text-gray-700">
      <strong>Email:</strong> {userData.email}
    </p>
    <p className="text-gray-700">
      <strong>Phone:</strong> {userData.mobileNo}
    </p>
  </div>
);

export default UserInfoCard;
