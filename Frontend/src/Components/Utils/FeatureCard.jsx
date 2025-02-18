import React from "react";

function FeatureCard({ title, description }) {
  return (
    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition duration-300">
      <h3 className="text-2xl font-bold text-blue-600 mb-4">{title}</h3>
      <p className="text-gray-700 text-lg leading-relaxed">{description}</p>
    </div>
  );
}

export default FeatureCard;
