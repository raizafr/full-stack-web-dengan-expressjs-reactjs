import { createContext, useState } from "react";

const RegisterContext = createContext();

const RegisterContextProvider = ({ children }) => {
  const [emailRegisterOtp, setEmailRegisterOtp] = useState(false);
  return (
    <RegisterContext.Provider value={{ emailRegisterOtp, setEmailRegisterOtp }}>
      {children}
    </RegisterContext.Provider>
  );
};

export { RegisterContext, RegisterContextProvider };
