import React, { useState } from "react";
import PlanCard from "../../Utils/PlanCard";
import { FaRegCompass } from "react-icons/fa";

const ExploreOtherPlansSection = ({ planData, handleBuyPlan }) => {
  const [showExplorePlans, setShowExplorePlans] = useState(true);

  return (
    <>
      <div
        id="ExploreOtherPlansSection"
        className="bg-white p-6 rounded-xl border border-gray-200"
      >
        {/* Header with Show/Hide button */}
        <div className="flex  items-center mb-6">
          <span className="flex items-center text-xl font-semibold text-gray-800">
            <FaRegCompass className="mr-2 text-blue-500" /> {/* Icon */}
            Explore Other Plans
          </span>

          <span
            onClick={() => setShowExplorePlans((prev) => !prev)}
            className="text-red-600 cursor-pointer px-4 py-2"
          >
            {showExplorePlans ? "Hide Plans" : "Show Plans"}
          </span>
        </div>

        {/* Conditionally render the plans */}
        {showExplorePlans && planData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {planData.map((plan) => (
              <div
                key={plan._id}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col h-full"
              >
                {/* Plan content will fill available space */}
                <div className="flex-grow">
                  <PlanCard
                    title={plan.name}
                    duration={plan.duration}
                    price={`${plan.price}`}
                    services={plan.services}
                  />
                </div>
                {/* Button to choose plan */}
                <button
                  className="block mt-4 text-center bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-all duration-300"
                  onClick={() => handleBuyPlan(plan._id)}
                >
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        ) : planData.length === 0 ? (
          <p className="text-gray-500 italic text-center">
            No plans available.
          </p>
        ) : null}
      </div>
    </>
  );
};

export default ExploreOtherPlansSection;
