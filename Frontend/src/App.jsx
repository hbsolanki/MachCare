import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Utils
import Index from "./Components/Utils/Index";
import Page404 from "./Components/Utils/Page404";
import Feedback from "./Components/Utils/Feedback";
import ContactUs from "./Components/Utils/ContactUs";
import About from "./Components/Utils/About";

//User
import User from "./Components/User/User";
import UserSignup from "./Components/User/UserSignup";
import UserSignin from "./Components/User/UserSignin";
import UserVehicleRegistration from "./Components/User/UserVehicleRegistration";
import UserProfile from "./Components/User/Profile";
import UserProfileEdit from "./Components/User/ProfileEdit";
import VehicleEdit from "./Components/User/VehicleEdit";
import NeedHelp from "./Components/User/NeedHelp";

//Mechanical
import Mechanical from "./Components/Mechanical/Mechanical";
import MechanicalSignin from "./Components/Mechanical/MechanicalSignin";
import MechanicalSignup from "./Components/Mechanical/MechanicalSignup";
import MechanicProfileEdit from "./Components/Mechanical/MechanicProfileEdit";
import Fund from "./Components/Mechanical/Fund";
import ManageService from "./Components/Mechanical/ManageService";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* login route */}

          {/* //User */}
          <Route path="/user" element={<User />} />
          <Route path="/user/signup" element={<UserSignup />} />
          <Route path="/user/signin" element={<UserSignin />} />

          <Route
            path="/user/vehicle/new"
            element={<UserVehicleRegistration />}
          />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/profile/edit" element={<UserProfileEdit />} />
          <Route path="/user/vehicle/edit/:vid" element={<VehicleEdit />} />
          <Route path="/user/service/need" element={<NeedHelp />} />

          {/* Mechanical */}
          <Route path="/mechanic" element={<Mechanical />} />
          {/* <Route path="/mechanical/signin" element={<Signin />} /> */}
          <Route path="/mechanic/signup" element={<MechanicalSignup />} />
          <Route path="/mechanic/signin" element={<MechanicalSignin />} />
          <Route
            path="/mechanic/profile/edit"
            element={<MechanicProfileEdit />}
          />
          <Route path="/mechanic/services" element={<ManageService />} />
          {/* <Route path="/mechanical/services/edit" element={<ServicesEdit />} /> */}
          <Route path="/mechanical/fund" element={<Fund />} />

          {/* Util */}
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/about" element={<About />} />

          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
