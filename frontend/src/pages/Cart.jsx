import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import Logo from "../../public/assets/svg/logo.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import CartCard from "../components/card/CartCard";

const Cart = () => {
  const [carts, setCarts] = useState([]);

  const getAllCart = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_BASEURL_API}/api/v1/carts`
      );
      setCarts(res.data.getCarts);
    } catch (err) {
      console.log(err.status);
    }
  };
  useEffect(() => {
    getAllCart();
  }, []);

  return (
    <>
      <nav>
        <div className=" px-6 py-4 bg-white/80 backdrop-blur-md shadow-md w-full top-0 left-0 right-0 z-10">
          <div className="flex items-center">
            <Link
              to={"/"}
              className="text-xl font-bold flex items-center gap-2"
            >
              <ReactSVG src={Logo} /> <p>|| Cart</p>
            </Link>
          </div>
        </div>
      </nav>

      <section className="h-screen bg-gray-100 px-4 antialiased space-y-5 md:space-x-10 flex flex-col items-center pt-2 md:flex-row md:items-start md:justify-center md:gap-5 b">
        <div className=" bg-white md:p-10 lg:px-24 p-3 rounded-md space-y-2">
          {carts.map((cart, key) => {
            return <CartCard key={key} cart={cart} />;
          })}
        </div>

        <div className="bg-white font-semibold rounded-3xl border shadow-lg p-10 max-w-xs">
          <h1 className="text-lg text-gray-700"> Shoping detail </h1>
          <h3 className="text-sm flex justify-between">
            {" "}
            <p className="text-gray-400">Total Price</p>
            <p>Rp76.000</p>{" "}
          </h3>
          <div className="flex justify-center">
            <button className="bg-indigo-600 px-8 py-2 mt-8 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide">
              CheckOut
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
