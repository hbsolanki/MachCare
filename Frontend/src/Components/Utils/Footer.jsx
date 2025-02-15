import React from "react";
import {Link} from "react-router-dom"

function Footer() {
  return (
    <>
      {" "}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
          <div className="mb-6">
            <Link
              to="https://www.facebook.com/machcare"
              className="text-gray-300 hover:text-orange-500 mx-3"
            >
              Facebook
            </Link>
            <Link
              to="https://twitter.com/machcare"
              className="text-gray-300 hover:text-orange-500 mx-3"
            >
              Twitter
            </Link>
            <Link
              to="https://www.instagram.com/machcare"
              className="text-gray-300 hover:text-orange-500 mx-3"
            >
              Instagram
            </Link>
          </div>
          <p className="text-lg mb-4">
            Quality vehicle services, maintenance, and repairs. We keep your
            ride in top shape!
          </p>
          <p className="text-sm">&copy; 2024 MachCare. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
