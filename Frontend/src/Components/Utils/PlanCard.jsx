import React from "react";
import { Link } from "react-router-dom";

function PlanCard({ title, description, price, link }) {
  return (
    <div className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 p-8 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
      <h3 className="text-2xl font-semibold text-orange-500 mb-4">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <p className="text-gray-700 mb-4">Price: {price}</p>
      {link && (
        <Link
          to={link}
          className="bg-orange-500 text-white py-3 px-6 rounded-lg text-lg hover:bg-orange-600 transition duration-300"
        >
          Choose Plan
        </Link>
      )}
    </div>
  );
}

export default PlanCard;
