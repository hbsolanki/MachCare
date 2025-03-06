import React from "react";

function ActivePlanCard({
  title,
  description,
  price,
  duration,
  services = [],
}) {
  return (
    <div className="bg-white p-6  ">
      <h3 className="text-xl font-semibold mb-2 flex justify-between items-center">
        <span>{title}</span>
        <span className="text-blue-600 font-bold">₹{price}</span>
      </h3>
      <p className="text-gray-700 mb-2">{description}</p>

      {/* Display Duration */}
      <p className=" font-semibold  flex text-sm text-gray-500 mb-2">
        <strong>Remaining Days: </strong> {duration}{" "}
        {duration > 1 ? " Days" : " Day"}
      </p>

      {/* Render services as an unordered list */}
      {services.length > 0 ? (
        <ul className="list-disc list-inside mb-4 text-gray-600">
          {services.map((service, index) => (
            <li key={index} className="flex justify-between">
              <span>{service.name}</span>
              <span className="font-semibold">x {service.count}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">
          No services included in this plan.
        </p>
      )}
    </div>
  );
}

export default ActivePlanCard;
