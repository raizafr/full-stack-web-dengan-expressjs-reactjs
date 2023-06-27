import { BsPersonGear } from "react-icons/bs";
import { SlWallet } from "react-icons/sl";
import { GrTransaction, GrUnorderedList } from "react-icons/gr";
import { AiOutlineHistory } from "react-icons/ai";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useContext, useState } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import LogoutModal from "./LogoutModal";
import { Link } from "react-router-dom";

const ModalProfile = () => {
  const [isLogOutModal, setIsLogOutModal] = useState(false);
  const { currentUser } = useContext(CurrentUserContext);
  const handleModalLogOut = () => {
    setIsLogOutModal(!isLogOutModal);
  };

  return (
    <>
      <div className=" right-0 bg-white top-12 absolute sm:mr-3 mr-1 z-10 rounded-2xl shadow-md">
        <div
          className={`px-5 py-5 flex gap-3 bg-[#1B4397] rounded-t-2xl ${
            !currentUser && "rounded-b-2xl"
          }`}
        >
          {currentUser ? (
            <>
              <img
                src="https://placehold.co/500x500/png"
                alt=""
                className="w-[50px] h-[50px] rounded-full"
              />
              <div className="text-white">
                <h3 className="font-semibold">{currentUser.username}</h3>
                <p className="font-thin">{currentUser.email}</p>
              </div>
            </>
          ) : (
            <>
              <div className="text-white font-semibold flex flex-row justify-center w-full gap-4">
                <Link
                  to={"/login"}
                  className="bg-blue-500 px-3 py-1 rounded-lg hover:bg-blue-600"
                >
                  Login
                </Link>
                <Link
                  to={"/register"}
                  className="bg-blue-500 px-3 py-1 rounded-lg hover:bg-blue-600"
                >
                  Register
                </Link>
              </div>
            </>
          )}
        </div>
        {currentUser && (
          <>
            <div className="px-5 py-6 grid grid-cols-2 gap-3">
              <Link to={"/profile"} className="flex gap-2 hover:text-blue-400">
                <BsPersonGear className="scale-125 mt-1" /> My Account
              </Link>
              <Link
                to={"/changePassword"}
                className="flex gap-2 hover:text-blue-400"
              >
                <RiLockPasswordLine className="scale-125 mt-1" /> Change
                Password
              </Link>
              <div className="flex gap-2">
                <GrTransaction className="scale-125 mt-1" /> My Transaction
              </div>
              <div className="flex gap-2">
                <AiOutlineHistory className="scale-125 mt-1" /> History
              </div>
              <div className="flex gap-2">
                <GrUnorderedList className="scale-125 mt-1" /> My Order
              </div>
              <div className="flex gap-2">
                <MdOutlineFavoriteBorder className="scale-125 mt-1" /> My
                Favorite
              </div>
            </div>
            <div className="text-center pb-5 px-5">
              <button
                className="bg-red-600 w-full text-white py-1 rounded-lg font-semibold hover:bg-red-400 hover:text-red-900"
                onClick={handleModalLogOut}
              >
                Sign Out
              </button>
            </div>
          </>
        )}
      </div>
      {isLogOutModal && <LogoutModal props={handleModalLogOut} />}
    </>
  );
};

export default ModalProfile;
