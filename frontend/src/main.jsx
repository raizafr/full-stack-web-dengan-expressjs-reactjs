import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { RegisterContextProvider } from "./context/RegisterContext.jsx";
import "react-toastify/dist/ReactToastify.css";
import { CurrentUserContextProvider } from "./context/CurrentUserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <RegisterContextProvider>
      <CurrentUserContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </CurrentUserContextProvider>
    </RegisterContextProvider>
  </BrowserRouter>
);
