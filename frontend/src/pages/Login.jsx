import { Link, useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import Logo from "../../public/assets/svg/logo.svg";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const res = await axios.post("http://localhost:3000/api/v1/auth/login", {
        email,
        password,
      });
      navigate("/");
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (err) {
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className="h-screen">
      <nav>
        <div className="flex justify-around py-4 bg-white/80 backdrop-blur-md shadow-md w-full top-0 left-0 right-0 z-10">
          <div className="flex items-center">
            <Link to={"/"}>
              <ReactSVG src={Logo} />
            </Link>
          </div>
        </div>
      </nav>
      <ToastContainer />
      <div className="flex items-center justify-center lg:mt-20 px-2 mt-14">
        <div className="mx-auto w-full max-w-[550px]">
          <form onSubmit={handleSubmit}>
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

            <div className="flex justify-end">
              <button className="hover:shadow-form rounded-md bg-[#1B4397] hover:bg-[#3268db] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                Login
              </button>
            </div>
          </form>
          <div className="text-center font-semibold opacity-80">
            Belum punya akun?{" "}
            <Link
              to={"/register"}
              className="text-blue-700 hover:text-blue-400"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
