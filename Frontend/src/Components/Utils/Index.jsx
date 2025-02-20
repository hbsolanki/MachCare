import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";
import PlanCard from "./PlanCard";
import FeatureCard from "./FeatureCard";
import { getGlobalVariable } from "../../globalVariable";

const Backend = getGlobalVariable();

function Index() {
  const [plansData, setPlansData] = useState([]);

  useEffect(() => {
    const fetchPlanData = async () => {
      try {
        const response = await axios.get(`${Backend}/API/plan`);
        setPlansData(response.data);
      } catch (error) {
        console.error("Error fetching plan data:", error);
      }
    };
    fetchPlanData();
  }, []);

  return (
    <div className="font-sans bg-white text-black">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex flex-col justify-center items-center text-center px-6"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/1051029946/photo/people-holding-hand-are-repairing-a-motorcycle.jpg?s=612x612&w=0&k=20&c=ZAdC5r-MzTHu6GfnOd-UxBZfYqTGMAlDMbQND6ktWVY=')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 text-white text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 hover:scale-105 transition-transform duration-300">
            Welcome to MachCare
          </h1>
          <p className="text-lg sm:text-xl mb-6">
            Your trusted partner for vehicle servicing, maintenance, and
            repairs. We provide seamless solutions to keep your vehicle in top
            condition.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-6">
            <Link
              to="/user/signup"
              className="bg-blue-600 text-white py-3 px-8 rounded-lg text-lg hover:bg-blue-700 transition duration-300 shadow-lg"
            >
              Sign up
            </Link>
            <Link
              to="/user/signin"
              className="bg-gray-700 text-white py-3 px-8 rounded-lg text-lg hover:bg-gray-600 transition duration-300 shadow-lg"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 px-6 sm:px-12 text-center">
        <h2 className="text-4xl font-semibold text-blue-900 mb-8">
          About MachCare
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          MachCare connects users with certified mechanics for hassle-free
          vehicle servicing.
        </p>
      </section>

      {/* User Plans Section */}
      <section className="py-20 px-6 sm:px-12 bg-gray-100 text-center">
        <h2 className="text-4xl font-semibold text-blue-900 mb-12">
          Our Plans for Users
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-10">
          Choose from flexible service plans tailored to your vehicle's needs.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {plansData.map((plan) => (
            <PlanCard
              key={plan._id}
              title={plan.name}
              duration={plan.duration}
              price={`${plan.price}`}
              services={plan.services}
            />
          ))}
        </div>
      </section>

      {/* Mechanic Section */}
      <section className="py-20 px-6 sm:px-12 bg-gray-200 text-center">
        <h2 className="text-4xl font-semibold text-blue-900 mb-8">
          Join MachCare as a Mechanic
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
          Get paid per service and work with flexible schedules.
        </p>
        <div className="flex justify-center gap-6">
          <Link
            to="/mechanic/signup"
            className="bg-blue-600 text-white py-3 px-8 rounded-lg text-lg hover:bg-blue-700 transition duration-300"
          >
            Signup
          </Link>
          <Link
            to="/mechanic/signin"
            className="bg-gray-700 text-white py-3 px-8 rounded-lg text-lg hover:bg-gray-600 transition duration-300"
          >
            Signin
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-6 sm:px-12 text-center">
        <h2 className="text-4xl font-semibold text-blue-900 mb-12">
          Why Choose MachCare?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Convenience"
            description="Get services delivered to your doorstep."
          />
          <FeatureCard
            title="Affordable Plans"
            description="Plans for every budget."
          />
          <FeatureCard
            title="Certified Mechanics"
            description="Trusted professionals for reliable service."
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 sm:px-12 bg-gray-100 text-center">
        <h2 className="text-4xl font-semibold text-blue-900 mb-12">
          What Our Customers Say
        </h2>
        <div className="max-w-4xl mx-auto">
          <blockquote className="text-lg text-gray-700 italic">
            "MachCare has transformed the way I maintain my car. Their certified
            mechanics are professional and pricing is reasonable!"
          </blockquote>
          <p className="text-gray-900 font-semibold mt-4">— Rajesh Patel</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-200 text-center">
        <h2 className="text-4xl font-semibold text-blue-900 mb-6">
          Need Assistance?
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Contact our support team for any queries or issues.
        </p>
        <a
          href="mailto:support@machcare.com"
          className="bg-blue-600 text-white py-3 px-6 rounded-lg text-lg hover:bg-blue-700 transition duration-300"
        >
          Contact Support
        </a>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Index;
