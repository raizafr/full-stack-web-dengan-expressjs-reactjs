import { ReactSVG } from "react-svg";
import Logo from "../../public/assets/svg/logo.svg";
import { AiOutlineBell, AiOutlineShoppingCart } from "react-icons/ai";
import { GoPerson } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import ModalProfile from "./modal/ModalProfile";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isModalProfile, setIsModalProfile] = useState(false);

  const handleClickProfile = () => {
    setIsModalProfile(!isModalProfile);
  };
  return (
    <nav>
      <div className="flex justify-around py-4 bg-white/80 backdrop-blur-md shadow-md w-full top-0 left-0 right-0 z-10">
        <div className="flex items-center">
          <a className="cursor-pointer">
            <h3 className="text-2xl font-medium text-blue-500">
              <ReactSVG src={Logo} />
            </h3>
          </a>
        </div>

        <div className="items-center hidden space-x-8 lg:flex w-2/5">
          <form className="w-full">
            <label
              htmlFor="search"
              className="flex flex-row-reverse items-center"
            >
              <input
                type="text"
                placeholder="Search something here..."
                id="search"
                name="search"
                className=" w-full focus:outline-none rounded-md border px-8 py-1.5 -ml-6 focus:border-blue-400 focus:placeholder-blue-400"
              />
              <FiSearch className="scale-125 text-gray-400" />
            </label>
          </form>
        </div>

        <div className="flex items-center space-x-5">
          <Link
            to={"/cart"}
            className="flex text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-300"
          >
            <AiOutlineShoppingCart className="scale-125" />
          </Link>
          <a className="flex text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-300 font-semibold">
            <AiOutlineBell className="scale-125" />
          </a>
          <button
            className="flex text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-300 font-semibold"
            onClick={handleClickProfile}
          >
            <GoPerson className="scale-125" />
          </button>
        </div>
      </div>
      {isModalProfile && <ModalProfile />}
    </nav>
  );
};

export default Navbar;
