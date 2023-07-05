import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ConfirmOtp from "./pages/ConfirmOtp";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import Cart from "./pages/Cart";

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
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </>
    </>
  );
}

export default App;
