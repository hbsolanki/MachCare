import { Link } from "react-router-dom";
import { Edit, Trash } from "lucide-react"; // Import icons for edit and delete
import { FaCar, FaPlus } from "react-icons/fa"; // Import the icons
const VehiclesSection = ({ userData, setIsModalOpen, setSelectedVehicle }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-200 w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center">
          {" "}
          <FaCar className="mr-2" /> Your Vehicles
        </h3>
        <Link
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md transition-all transform hover:scale-105"
          to="/user/vehicle/new"
        >
          <FaPlus className="mr-2" /> {/* Plus icon */}
          Add Vehicle
        </Link>
      </div>

      {userData?.registered_vehicles?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Sr.</th>
                <th className="border border-gray-300 px-4 py-2">Model</th>
                <th className="border border-gray-300 px-4 py-2">Type</th>
                <th className="border border-gray-300 px-4 py-2">Fuel Type</th>
                <th className="border border-gray-300 px-4 py-2">
                  Vehicle No.
                </th>
                <th className="border border-gray-300 px-4 py-2">Year</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userData.registered_vehicles.map((vehicle, index) => (
                <tr key={vehicle._id} className="text-center hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">
                    {vehicle.model}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {vehicle.type}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {vehicle.fuelType.toUpperCase()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {vehicle.vehicleNo}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {vehicle.manufacturingYear || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 flex justify-center items-center space-x-4">
                    {/* Edit Button with Icon */}
                    <Link
                      className="text-blue-600 flex items-center space-x-1"
                      to={`/user/vehicle/edit/${vehicle._id}`}
                    >
                      <Edit size={16} />
                      <span>Edit</span>
                    </Link>

                    {/* Delete Button with Icon */}
                    <button
                      className="text-red-600 flex items-center space-x-1"
                      onClick={() => {
                        setSelectedVehicle(vehicle);
                        setIsModalOpen(true);
                      }}
                    >
                      <Trash size={16} />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No vehicles registered yet.</p>
      )}
    </div>
  );
};

export default VehiclesSection;
