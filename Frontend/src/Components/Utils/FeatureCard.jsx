import React from "react";

function FeatureCard({ title, description }) {
  return (
    <div className="bg-white shadow-lg p-8 rounded-lg hover:shadow-2xl transition duration-300">
      <h3 className="text-xl font-semibold text-orange-500 mb-4">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}

export default FeatureCard;
