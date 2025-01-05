import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Utils
import Index from "./Components/Utils/Index";
import Page404 from "./Components/Utils/Page404";

//User
import User from "./Components/User/User";
import UserRegistration from "./Components/User/UserRegistration";
import UserLogin from "./Components/User/UserLogin";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* //User */}
          <Route path="/user" element={<User />} />
          <Route path="/user/registration" element={<UserRegistration />} />
          <Route path="/user/login" element={<UserLogin />} />

          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
