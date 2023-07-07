import { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { formatNumber } from "../utils/formatNumber";

const CartCard = ({ cart, handleClick }) => {
  const [quantity, setQuantity] = useState(1);
  const handleClickPlus = () => {
    setQuantity(quantity + 1);
  };
  const handleClickMin = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  // console.log(propsHandleClik);
  return (
    <div className="sm:w-[384px] sm:h-[148px] bg-white px-[32px] py-[16px] space-y-2 shadow-md rounded-lg cursor-pointer transition duration-300">
      <div className="flex item-center gap-4">
        <img
          src={cart.productImageUrl}
          alt={cart.productImageName}
          className="w-[75px] h-[75px] rounded-md"
        />
        <div className="flex flex-col justify-center space-y-2">
          <h3 className="font-semibold">{cart.productName}</h3>
          <p className="text-sm line-clamp-1 flex gap-3 items-center">
            <button onClick={handleClickMin}>
              <AiOutlineMinus />
            </button>
            <span>{quantity}</span>
            <button onClick={handleClickPlus}>
              <AiOutlinePlus />
            </button>
          </p>
        </div>
      </div>
      <div className="flex justify-between">
        <h4 className="text-xs bg-[#5DC264] w-[75px] rounded-md flex justify-center items-center font-semibold text-white text-opacity-80">
          Rp{cart.pricePerProduct}
        </h4>
        <h3 className="font-semibold flex gap-3 items-center">
          <p>Rp{formatNumber(cart.pricePerProduct * quantity)}</p>
          <button
            className="text-sm bg-blue-400 text-white px-3 py-0.5 rounded-md hover:bg-blue-500"
            onClick={() => handleClick(cart, quantity)}
          >
            Checkout
          </button>
        </h3>
      </div>
    </div>
  );
};

export default CartCard;
