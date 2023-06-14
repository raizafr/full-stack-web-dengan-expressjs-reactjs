import { Link, useNavigate } from "react-router-dom";
import { BsList } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    const open = document.getElementById("open");
    const close = document.getElementById("close");
    const navMobile = document.getElementById("nav-mobile");
    open.classList.toggle("hidden");
    close.classList.toggle("hidden");
    navMobile.classList.toggle("hidden");
  };

  const handleLogout = async () => {
    try {
      await axios.delete("http://localhost:3000/api/v1/auth/logout");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <nav className="flex justify-between bg-[#689F38] md:px-20 px-4 py-4 font-bold text-white hover:bg-[#8BC34A] transition-colors sticky top-0">
        <div className="hover:text-[#f5ff3a]">
          <Link to={"/"}>MY WEBSITE</Link>
        </div>
        <div className="mt-1 md:hidden" onClick={handleClick}>
          <BsList className="scale-125 " id="open" />
          <IoMdClose className="scale-125 hidden" id="close" />
        </div>
        <ul className="md:flex space-x-3 hidden ">
          <li className="hover:text-[#f5ff3a]">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="hover:text-[#f5ff3a]">
            <Link onClick={handleLogout}>Logout</Link>
          </li>
          <li className="hover:text-[#f5ff3a]">
            <Link to={"/login"}>Login</Link>
          </li>
          <li className="hover:text-[#f5ff3a]">
            <Link to={"/register"}>Register</Link>
          </li>
        </ul>
      </nav>
      <ul
        className="bg-[#689F38] text-white font-bold text-center space-y-1 md:hidden hidden  "
        id="nav-mobile"
      >
        <li className="hover:text-[#f5ff3a]">
          <Link to={"/"}>Home</Link>
        </li>
        <li className="hover:text-[#f5ff3a]">
          <Link to={"/login"}>Login</Link>
        </li>
        <li className="hover:text-[#f5ff3a]">
          <Link to={"/register"}>Register</Link>
        </li>
      </ul>
    </>
  );
};

export default Navbar;
