import { Link, useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import Logo from "../../public/assets/svg/logo.svg";
import { useContext } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { RegisterContext } from "../context/RegisterContext";

const Register = () => {
  const navigate = useNavigate();
  const { setEmailRegisterOtp } = useContext(RegisterContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const firstName = e.target[0].value;
    const lastName = e.target[1].value;
    const username = e.target[2].value;
    const email = e.target[3].value;
    const password = e.target[4].value;
    const confirmPassword = e.target[5].value;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BASEURL_API}/api/v1/auth/register`,
        { firstName, lastName, username, email, password, confirmPassword }
      );
      setEmailRegisterOtp(res.data.email);
      navigate("/confirmOtp");
      toast.success("Success Notification !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(res);
    } catch (err) {
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_Right,
      });
    }
  };

  return (
    <>
      <nav>
        <div className="flex justify-around py-4 bg-white/80 backdrop-blur-md shadow-md w-full top-0 left-0 right-0 z-10">
          <div className="flex items-center">
            <Link
              to={"/"}
              className="text-xl font-bold flex items-center gap-2"
            >
              <ReactSVG src={Logo} /> <p>|| Register</p>
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
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="confirmPassword"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="flex justify-end">
              <button className="hover:shadow-form rounded-md bg-[#1B4397] hover:bg-[#3268db] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                Register
              </button>
            </div>
          </form>
          <div className="text-center font-semibold opacity-80">
            Sudah punya akun?{" "}
            <Link to={"/login"} className="text-blue-700 hover:text-blue-400">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
