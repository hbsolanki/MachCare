import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-16">
      <div className="container mx-auto flex flex-col items-center text-center px-6">
        <h3 className="text-3xl font-semibold mb-4 text-blue-400">Follow Us</h3>
        <div className="flex gap-6 mb-6">
          <Link
            to="https://www.facebook.com/machcare"
            className="text-gray-300 hover:text-blue-500 text-2xl transition duration-300"
          >
            <FaFacebook />
          </Link>
          <Link
            to="https://twitter.com/machcare"
            className="text-gray-300 hover:text-blue-400 text-2xl transition duration-300"
          >
            <FaTwitter />
          </Link>
          <Link
            to="https://www.instagram.com/machcare"
            className="text-gray-300 hover:text-pink-500 text-2xl transition duration-300"
          >
            <FaInstagram />
          </Link>
        </div>
        <p className="text-lg text-gray-300 max-w-lg">
          Quality vehicle services, maintenance, and repairs. We keep your ride
          in top shape!
        </p>
        <p className="text-sm mt-4 text-gray-400">
          &copy; {new Date().getFullYear()} MachCare. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
