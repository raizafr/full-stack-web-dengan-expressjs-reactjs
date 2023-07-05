import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";

const CurrentUserContext = createContext();

const CurrentUserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    user: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      imageName: "",
      imageUrl: "",
    },
  });

  const fetchDataUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_BASEURL_API}/api/v1/auth/user`
      );
      setCurrentUser(res.data);
    } catch (err) {
      setCurrentUser(null);
    }
  };
  useEffect(() => {
    fetchDataUser();
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, fetchDataUser, setCurrentUser }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export { CurrentUserContext, CurrentUserContextProvider };
