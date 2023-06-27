import { Link } from "react-router-dom";

const ModalChangePassword = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center fixed bg-black bg-opacity-30 top-0 z-10">
      <div className="w-1/3 bg-white shadow-lg rounded-lg h -m-36 px-5 py-5">
        <div className="">
          <p className="text-center font-bold text-xl">
            Change Password Successful
          </p>
        </div>
        <div className="flex justify-center pt-5">
          <Link
            to={"/"}
            className="focus:outline-none px-4 bg-teal-500 p-3 ml-3 rounded-lg text-white hover:bg-teal-400"
          >
            Back To Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ModalChangePassword;
