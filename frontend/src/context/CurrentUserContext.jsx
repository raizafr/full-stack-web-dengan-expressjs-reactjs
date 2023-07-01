import axios from "axios";
import { useCallback } from "react";
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
    },
  });

  const fetchDataUser = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/auth/user");
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
