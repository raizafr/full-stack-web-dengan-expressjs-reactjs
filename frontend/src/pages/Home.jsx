import Headroom from "react-headroom";
import FirstSection from "../components/section/FirstSection";
import SecondSection from "../components/section/SecondSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const { fetchDataUser } = useContext(CurrentUserContext);
  useEffect(() => {
    fetchDataUser();
  }, []);

  return (
    <>
      <Headroom>
        <Navbar />
      </Headroom>
      <ToastContainer />
      <FirstSection />
      <SecondSection />
      <Footer />
    </>
  );
};

export default Home;
