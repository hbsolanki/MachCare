import { Link } from "react-router-dom";
import Footer from "./Footer";
import PlanCard from "./PlanCard"; // Import the PlanCard component
import FeatureCard from "./FeatureCard"; // Import the FeatureCard component

function Index() {
  return (
    <div className="font-sans">
      {/* Hero Section with Gradient Background */}
      <section className="bg-gradient-to-r from-orange-600 to-yellow-500 text-white text-center py-20">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          Welcome to MachCare
        </h1>
        <p className="text-lg sm:text-xl mb-10">
          Your trusted partner for vehicle servicing, maintenance, and repairs.
          Quality services, exceptional care.
        </p>
        <div className="flex justify-center gap-6">
          <Link
            to="/user/registration"
            className="bg-orange-600 text-white py-3 px-8 rounded-lg text-xl sm:text-2xl hover:bg-orange-500 transition duration-300"
          >
            Registration User
          </Link>
          <Link
            to="/user/login"
            className="bg-yellow-500 text-white py-3 px-8 rounded-lg text-xl sm:text-2xl hover:bg-yellow-400 transition duration-300"
          >
            Login User
          </Link>
        </div>
      </section>

      {/* User Section */}
      <section className="bg-gray-50 py-20 px-6 sm:px-12">
        <h2 className="text-3xl sm:text-4xl font-semibold text-orange-600 text-center mb-8">
          For Users
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Use PlanCard for each plan */}
          <PlanCard
            title="Basic Plan"
            description="Routine maintenance, oil changes, tire rotations, and fluid checks."
            price="$99.99/month"
          />
          <PlanCard
            title="Premium Plan"
            description="Comprehensive service with engine diagnostics and repair discounts."
            price="$199.99/month"
          />
          <PlanCard
            title="Ultimate Plan"
            description="All-inclusive services including on-demand repairs and roadside assistance."
            price="$299.99/month"
          />
        </div>
      </section>

      {/* Mechanic Section */}
      <section className="bg-gradient-to-r from-gray-800 to-black text-white py-20 px-6 sm:px-12">
        <h2 className="text-3xl sm:text-4xl font-semibold text-orange-500 text-center mb-8">
          For Mechanics
        </h2>
        <p className="text-lg sm:text-xl text-center mb-6">
          Join MachCare and start earning! As a certified mechanic, you can work
          with a trusted platform, get paid per service, and maintain a flexible
          schedule.
        </p>
        <div className="flex justify-center gap-6">
          <Link
            to="/mechanic-registration"
            className="bg-orange-500 text-white py-3 px-8 rounded-lg text-lg sm:text-xl hover:bg-orange-400 transition duration-300"
          >
            Register as Mechanic
          </Link>
          <Link
            to="/mechanic-login"
            className="bg-gray-900 text-white py-3 px-8 rounded-lg text-lg sm:text-xl hover:bg-gray-700 transition duration-300"
          >
            Login as Mechanic
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-100 py-20 px-6 sm:px-12">
        <h2 className="text-3xl sm:text-4xl font-semibold text-orange-600 text-center mb-8">
          Why Choose MachCare?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Use FeatureCard for each feature */}
          <FeatureCard
            title="Convenience"
            description="Get services delivered right to your doorstep. No need to visit a garage."
          />
          <FeatureCard
            title="Affordable Plans"
            description="Our plans are designed to suit all budgets and offer great value for money."
          />
          <FeatureCard
            title="Certified Mechanics"
            description="All our mechanics are certified professionals you can trust for reliable vehicle service."
          />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-black text-white text-center">
        <h2 className="text-3xl font-semibold mb-6">Need Assistance?</h2>
        <p className="text-lg mb-8">
          We're here to help! Get in touch with our support team for any
          questions or concerns.
        </p>
        <a
          href="mailto:support@machcare.com"
          className="bg-orange-500 text-white py-3 px-6 rounded-lg text-lg sm:text-xl hover:bg-orange-400 transition duration-300"
        >
          Contact Support
        </a>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default Index;
