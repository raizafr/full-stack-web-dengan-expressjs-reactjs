import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState([]);
  const active = currentUser.is_acive;
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, active }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
