import ActivePlanCard from "./ActivePlanCard";
import { FaCheckCircle } from "react-icons/fa";

const ActivePlanSection = ({ userData }) => (
  <>
    {userData.plan.length > 0 && (
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h3 className="flex items-center text-2xl font-semibold mb-6 text-gray-800">
          <FaCheckCircle className="mr-2 text-green-500" /> {/* Icon */}
          Active Plan
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userData.plan.map((plan) => (
            <div
              key={plan._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
            >
              <div className="flex-grow">
                <ActivePlanCard
                  title={plan.name}
                  duration={plan.duration}
                  price={`${plan.price}`}
                  services={plan.services}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </>
);

export default ActivePlanSection;
