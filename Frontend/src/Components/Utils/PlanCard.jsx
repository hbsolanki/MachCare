import React from "react";
import { Link } from "react-router-dom";

function PlanCard({ title, description, price, link }) {
  return (
    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
      <h3 className="text-2xl font-bold text-blue-600 mb-4">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <p className="text-lg font-semibold text-gray-800 mb-6">Price: {price}</p>
      {link && (
        <Link
          to={link}
          className="bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-300 shadow-md"
        >
          Choose Plan
        </Link>
      )}
    </div>
  );
}

export default PlanCard;
