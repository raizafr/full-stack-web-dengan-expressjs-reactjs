import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Home = () => {
  const { setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/auth/user"
        );
        setCurrentUser(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [setCurrentUser]);
  return <div>home</div>;
};

export default Home;
