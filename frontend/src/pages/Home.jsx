import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router";

const Home = () => {
  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/auth/user"
        );
        setCurrentUser(response);
      } catch (err) {
        if (err.response.status === 401) {
          navigate("login");
        }
      }
    };

    fetchData();
  }, [setCurrentUser, navigate]);
  return <div>home</div>;
};

export default Home;
