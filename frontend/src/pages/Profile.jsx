import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import Logo from "../../public/assets/svg/logo.svg";
import { ToastContainer } from "react-toastify";
import { HiOutlineHome } from "react-icons/hi";
import { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const { currentUser, fetchDataUser } = useContext(CurrentUserContext);

  useEffect(() => {
    fetchDataUser();
  }, []);
  const [changeData, setChangeData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    username: currentUser.username,
    email: currentUser.email,
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setChangeData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const firstName = e.target[0].value;
    const lastName = e.target[1].value;
    const username = e.target[2].value;
    const email = e.target[3].value;

    try {
      const res = await axios.put(
        "http://localhost:3000/api/v1/auth/editProfile",
        {
          firstName,
          lastName,
          username,
          email,
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <nav>
        <div className="flex justify-around py-4 bg-white/80 backdrop-blur-md shadow-md w-full top-0 left-0 right-0 z-10">
          <div className="flex w-full justify-evenly items-center lg:px-10">
            <Link to={"/"}>
              <ReactSVG src={Logo} />
            </Link>
            <Link to={"/"}>
              <HiOutlineHome className="scale-[1.7] hover:text-blue-400" />
            </Link>
          </div>
        </div>
      </nav>
      <ToastContainer />
      <div className="flex items-center justify-center p-3">
        <div className="mx-auto w-full max-w-[550px]">
          <form onSubmit={handleSubmit}>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="firstName"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    First Name
                  </label>
                  <input
                    value={changeData.firstName || currentUser.firstName}
                    onChange={handleChange}
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="First Name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="lastName"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Last Name
                  </label>
                  <input
                    value={changeData.lastName || currentUser.lastName}
                    onChange={handleChange}
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Last Name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="username"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Username
              </label>
              <input
                value={changeData.username || currentUser.username}
                onChange={handleChange}
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Email
              </label>
              <input
                value={changeData.email || currentUser.email}
                onChange={handleChange}
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="flex justify-between">
              <Link
                to={"/"}
                className="hover:shadow-form rounded-md bg-[#1B4397] hover:bg-[#3268db] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                Home
              </Link>
              <button className="hover:shadow-form rounded-md bg-[#1B4397] hover:bg-[#3268db] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                Change
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
