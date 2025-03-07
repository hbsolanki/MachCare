import React from "react";

const ServiceSelection = ({
  availableServices,
  selectedServices,
  setSelectedServices,
}) => {
  const handleServiceSelection = (serviceName) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(serviceName)
        ? prevSelected.filter((name) => name !== serviceName)
        : [...prevSelected, serviceName]
    );
  };

  return (
    <>
      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
        Available Services
      </h2>

      {availableServices.length > 0 ? (
        <ul className="bg-white shadow rounded-lg p-4">
          {availableServices.map((service, index) => (
            <li
              key={index}
              className="flex items-center justify-between border-b py-2"
            >
              <label
                className={`flex items-center gap-3 cursor-pointer ${
                  service.count === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedServices.includes(service.name)}
                  onChange={() => handleServiceSelection(service.name)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded cursor-pointer"
                  disabled={service.count === 0}
                />
                <span className="text-gray-700">{service.name}</span>
              </label>
              <span className="font-semibold text-blue-600">
                x {service.count}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No services available.</p>
      )}
    </>
  );
};

export default ServiceSelection;
