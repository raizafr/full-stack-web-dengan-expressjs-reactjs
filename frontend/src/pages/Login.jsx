import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    console.log(email, password);
    try {
      await axios
        .post("http://localhost:3000/api/v1/auth/login", {
          email: email,
          password: password,
        })
        .then(function (res) {
          navigate("/");
          console.log(res);
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch(function (err) {
          console.log(err);
          toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="w-full  flex justify-center">
      <div className="bg-[#689F38] lg:w-1/3 w-4/5 md:w-2/5 mt-28 rounded py-5">
        <h2 className="font-bold text-center text-white text-xl">LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <div className="px-8">
            <div className="my-5">
              <input
                type="text"
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
            <button className="bg-[#8BC34A] w-full py-2 rounded text-white font-semibold hover:bg-[#a8ff44] hover:text-[#395b12]">
              login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
