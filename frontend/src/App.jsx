import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ConfirmOtp from "./pages/ConfirmOtp";
import Profile from "./pages/Profile";

function App() {
  axios.defaults.withCredentials = true;

  return (
    <>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/confirmOtp" element={<ConfirmOtp />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </>
    </>
  );
}

export default App;
