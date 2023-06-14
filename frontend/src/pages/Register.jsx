import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const confirmPasword = e.target[3].value;
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/register",
        {
          username: username,
          email: email,
          password: password,
          confirm_password: confirmPasword,
        }
      );
      navigate("/login");
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
    <section className="w-full  flex justify-center">
      <div className="bg-[#689F38] lg:w-1/3 w-4/5 md:w-2/5 mt-28 rounded py-5">
        <h2 className="font-bold text-center text-white text-xl">REGISTER</h2>
        <form onSubmit={handleSubmit}>
          <div className="px-8">
            <div className="my-5">
              <input
                type="text"
                className="w-full px-2 py-2 focus:outline-none rounded"
                placeholder="username"
              />
            </div>
            <div className="my-5">
              <input
                type="email"
                className="w-full px-2 py-2 focus:outline-none rounded"
                placeholder="example@gmail.com"
              />
            </div>
            <div className="my-5">
              <input
                type="password"
                className="w-full px-2 py-2 focus:outline-none rounded"
                placeholder="password"
              />
            </div>
            <div className="my-5">
              <input
                type="password"
                className="w-full px-2 py-2 focus:outline-none rounded"
                placeholder="confirm password"
              />
            </div>
            <button className="bg-[#8BC34A] w-full py-2 rounded text-white font-semibold hover:bg-[#a8ff44] hover:text-[#395b12]">
              register
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
