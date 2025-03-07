import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

const MechanicList = ({ mechanics }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-yellow-500" />
        ) : (
          <FaRegStar key={i} />
        )
      );
    }
    return stars;
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
        Nearby Mechanics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mechanics.map((mechanic) => (
          <div
            key={mechanic._id}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {mechanic.name}
            </h3>
            <p className="flex">{renderStars(mechanic.rating)}</p>
            <p className="text-gray-600">📧 {mechanic.email}</p>
            <p className="text-gray-600">📞 {mechanic.mobileNo}</p>
            <p className="text-gray-600">📍 Location: {mechanic.distance}</p>
            <button className="mt-2 text-blue-700">Select Mechanic</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MechanicList;
