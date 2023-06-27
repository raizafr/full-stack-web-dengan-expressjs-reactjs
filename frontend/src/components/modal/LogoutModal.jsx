import axios from "axios";
import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";

const LogoutModal = ({ props }) => {
  const { setCurrentUser } = useContext(CurrentUserContext);
  const handleLogOut = async () => {
    try {
      await axios.delete("http://localhost:3000/api/v1/auth/logout");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center fixed bg-black bg-opacity-30 top-0 z-10">
        <div className="w-1/3 bg-white shadow-lg rounded-lg h -m-36 px-5 py-5">
          <div className="">
            <p className="text-center font-bold text-xl">
              Apakah Yakin Ingin Sign-Out?
            </p>
          </div>
          <div className="flex justify-center pt-5">
            <button
              className="focus:outline-none modal-close px-4 bg-gray-400 p-3 rounded-lg text-black hover:bg-gray-300"
              onClick={props}
            >
              Cancel
            </button>
            <button
              className="focus:outline-none px-4 bg-teal-500 p-3 ml-3 rounded-lg text-white hover:bg-teal-400"
              onClick={() => {
                handleLogOut();
                props();
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoutModal;
