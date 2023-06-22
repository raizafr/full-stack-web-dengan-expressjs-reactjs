import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const FormOtp = (props) => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = props.email;
    const otpCode = e.target[0].value;

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/verifyOtp",
        {
          email,
          otpCode,
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
        <h2 className="font-bold text-center text-white text-xl">OTP CODE</h2>
        <form onSubmit={handleSubmit}>
          <div className="px-8">
            <div className="my-5">
              <input
                type="number"
                className="w-full px-2 py-2 focus:outline-none rounded"
                placeholder="otp code"
              />
            </div>
            <button className="bg-[#8BC34A] w-full py-2 rounded text-white font-semibold hover:bg-[#a8ff44] hover:text-[#395b12]">
              confirm
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default FormOtp;
