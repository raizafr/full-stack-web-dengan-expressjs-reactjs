import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import Logo from "../../public/assets/svg/logo.svg";
import { HiOutlineHome } from "react-icons/hi";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import ModalSuccess from "../components/modal/ModalSuccess";
const ChangePassword = () => {
  const [isModal, setIsModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentPassword = e.target[0].value;
    const newPassword = e.target[1].value;
    const confirmNewPassword = e.target[2].value;

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_APP_BASEURL_API}/api/v1/auth/changePassword`,
        { currentPassword, newPassword, confirmNewPassword }
      );
      console.log(res);
      setIsModal(true);
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (err) {
      toast.warn(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
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
            <div className="-mx-3">
              <div className="w-full px-3 sm:w-full">
                <div className="mb-5">
                  <label
                    htmlFor="currentPassword"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    id="currentPassword"
                    placeholder="Current Password"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-full">
                <div className="mb-5">
                  <label
                    htmlFor="newPassword"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    id="nerPassword"
                    placeholder="New Passowrod"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-full">
                <div className="mb-5">
                  <label
                    htmlFor="confirmNewPassword"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirmNewPassword"
                    id="confirmNewPassword"
                    placeholder="Confirm New Passowrod"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
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
        {isModal && <ModalSuccess title="Change Password Successful" />}
      </div>
    </>
  );
};

export default ChangePassword;
