import { useEffect, useState } from "react";
import FirstCard from "../card/FirstCard";
import axios from "axios";

const FirstSection = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_BASEURL_API}/api/v1/products`
      );
      setProducts(res.data.products);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="mt-5 container mx-auto px-2">
      <h1 className="font-bold text-2xl pb-3">Produk Unggulan</h1>
      <hr className="pb-3" />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 place-items-center">
        {products.map((product, key) => {
          return <FirstCard key={key} product={product} />;
        })}
      </div>
    </section>
  );
};

export default FirstSection;
