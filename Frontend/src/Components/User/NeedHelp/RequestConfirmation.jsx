import React from "react";
import { useNavigate } from "react-router-dom";

function RequestConfirmation() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-semibold mb-4">
        Request Sent Successfully!
      </h1>
      <p className="text-gray-600 mb-6">
        A mechanic will be assigned to you shortly.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
      >
        Back to Home
      </button>
    </div>
  );
}

export default RequestConfirmation;
