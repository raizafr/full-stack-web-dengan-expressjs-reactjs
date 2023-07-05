import axios from "axios";
import { toast } from "react-toastify";
import { formatNumber } from "../utils/formatNumber";
const FirstCard = ({ product }) => {
  const handleClick = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BASEURL_API}/api/v1/carts`,
        {
          productId: product.id,
          quantity: 1,
          pricePerProduct: product.price,
          productName: product.productName,
          productImageName: product.imageName,
          productImageUrl: product.imageUrl,
        }
      );
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (err) {
      toast.warn(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className="sm:w-[384px] sm:h-[148px] bg-white px-[32px] py-[16px] space-y-2 shadow-md rounded-lg cursor-pointer transition duration-300 hover:-translate-y-2">
      <div className="flex item-center gap-4">
        <img
          src={product.imageUrl}
          alt=""
          className="w-[75px] h-[75px] rounded-md"
        />
        <div className="flex flex-col justify-center space-y-2">
          <h3 className="font-semibold">{product.productName}</h3>
          <p className="text-sm opacity-60 line-clamp-1">
            {product.description}
          </p>
        </div>
      </div>
      <div className="flex justify-between">
        <h4 className="text-xs bg-[#5DC264] w-[75px] rounded-md flex justify-center items-center font-semibold text-white text-opacity-80">
          {product.category}
        </h4>
        <h3 className="font-semibold flex gap-3 items-center">
          <p>Rp{formatNumber(product.price)}</p>
          <button
            className="text-sm bg-blue-400 text-white px-3 py-0.5 rounded-md hover:bg-blue-500"
            onClick={handleClick}
          >
            Add to cart
          </button>
        </h3>
      </div>
    </div>
  );
};

export default FirstCard;
