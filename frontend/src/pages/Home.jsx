import Headroom from "react-headroom";
import FirstSection from "../components/section/FirstSection";
import SecondSection from "../components/section/SecondSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

const Home = () => {
  const { currentUser, fetchDataUser } = useContext(CurrentUserContext);
  useEffect(() => {
    fetchDataUser();
  }, []);
  console.log(currentUser);
  // const { setCurrentUser } = useContext(CurrentUserContext);

  // useEffect(() => {
  //   const fetchDataUser = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:3000/api/v1/auth/user");
  //       setCurrentUser(res.data);
  //     } catch (err) {
  //       setCurrentUser(null);
  //     }
  //   };
  //   fetchDataUser();
  // }, [setCurrentUser]);
  return (
    <>
      <Headroom>
        <Navbar />
      </Headroom>
      <FirstSection />
      <SecondSection />
      <Footer />
    </>
  );
};

export default Home;
