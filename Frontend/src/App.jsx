import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Utils
import Index from "./Components/Utils/Index";
import Page404 from "./Components/Utils/Page404";
import Feedback from "./Components/Utils/Feedback";
import ContactUs from "./Components/Utils/ContactUs";
import About from "./Components/Utils/About";
import Login from "./Components/Utils/Login";

//User
import User from "./Components/User/User";
import UserRegistration from "./Components/User/UserRegistration";
import UserVehicleRegistration from "./Components/User/UserVehicleRegistration";
import UserProfile from "./Components/User/Profile";
import UserProfileEdit from "./Components/User/ProfileEdit";

//Mechanical
import Mechanical from "./Components/Mechanical/Mechanical";
import Signin from "./Components/Mechanical/Signin";
import Signup from "./Components/Mechanical/Signup";
import MechanicalProfile from "./Components/Mechanical/Profile";
import MechanicalProfileEdit from "./Components/Mechanical/ProfileEdit";
import Services from "./Components/Mechanical/Services";
import ServicesEdit from "./Components/Mechanical/ServicesEdit";
import Fund from "./Components/Mechanical/Fund";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* login route */}
          <Route path="/login" element={<Login/>} />
          
          {/* //User */}
          <Route path="/user" element={<User />} />
          <Route path="/user/registration" element={<UserRegistration />} />
          <Route path="/user/vehicle/registration" element={<UserVehicleRegistration />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/profile/edit" element={<UserProfileEdit />}/>

          {/* Mechanical */}
          <Route path="/mechanical" element={<Mechanical />}/>
          <Route path="/mechanical/signin" element={<Signin />}/>
          <Route path="/mechanical/signup" element={<Signup />}/>
          <Route path="/mechanical/profile" element={<MechanicalProfile />}/>
          <Route path="/mechanical/profile/edit" element={<MechanicalProfileEdit />}/>
          <Route path="/mechanical/services" element={<Services />}/>
          <Route path="/mechanical/services/edit" element={<ServicesEdit />}/>
          <Route path="/mechanical/fund" element={<Fund />}/>

          {/* Util */}
          <Route path="/feedback" element={<Feedback />}/>
          <Route path="/contact-us" element={<ContactUs />}/>
          <Route path="/about" element={<About />}/>


          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
