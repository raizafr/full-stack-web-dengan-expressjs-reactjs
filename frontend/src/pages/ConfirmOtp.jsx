import { useContext, useEffect, useRef } from "react";
import { RegisterContext } from "../context/RegisterContext";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const ConfirmOtp = () => {
  const { emailRegisterOtp } = useContext(RegisterContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!emailRegisterOtp) return navigate("/register");
  }, [emailRegisterOtp, navigate]);

  const inputRefs = useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.keyCode === 8 && index > 0 && e.target.value === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode =
      e.target[0].value +
      e.target[1].value +
      e.target[2].value +
      e.target[3].value +
      e.target[4].value +
      e.target[5].value;

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/verifyOtp",
        {
          email: emailRegisterOtp,
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
    <>
      {/* component */}
      <ToastContainer />
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>
                  Kami telah mengirimkan kode OTP ke email {emailRegisterOtp}
                </p>
              </div>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-16 gap-2">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    <div className="w-16 h-16 ">
                      <input
                        ref={(el) => (inputRefs.current[0] = el)}
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name=""
                        id=""
                        maxLength="1"
                        onChange={(e) => handleInput(e, 0)}
                        onKeyDown={(e) => handleBackspace(e, 0)}
                      />
                    </div>
                    <div className="w-16 h-16 ">
                      <input
                        ref={(el) => (inputRefs.current[1] = el)}
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name=""
                        id=""
                        maxLength="1"
                        onChange={(e) => handleInput(e, 1)}
                        onKeyDown={(e) => handleBackspace(e, 1)}
                      />
                    </div>
                    <div className="w-16 h-16 ">
                      <input
                        ref={(el) => (inputRefs.current[2] = el)}
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name=""
                        id=""
                        maxLength="1"
                        onChange={(e) => handleInput(e, 2)}
                        onKeyDown={(e) => handleBackspace(e, 2)}
                      />
                    </div>
                    <div className="w-16 h-16 ">
                      <input
                        ref={(el) => (inputRefs.current[3] = el)}
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name=""
                        id=""
                        maxLength="1"
                        onChange={(e) => handleInput(e, 3)}
                        onKeyDown={(e) => handleBackspace(e, 3)}
                      />
                    </div>
                    <div className="w-16 h-16 ">
                      <input
                        ref={(el) => (inputRefs.current[4] = el)}
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name=""
                        id=""
                        maxLength="1"
                        onChange={(e) => handleInput(e, 4)}
                        onKeyDown={(e) => handleBackspace(e, 4)}
                      />
                    </div>
                    <div className="w-16 h-16 ">
                      <input
                        ref={(el) => (inputRefs.current[5] = el)}
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name=""
                        id=""
                        maxLength="1"
                        onChange={(e) => handleInput(e, 5)}
                        onKeyDown={(e) => handleBackspace(e, 5)}
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                        Verify Account
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOtp;
