import { GrClose } from "react-icons/gr";
import { formatNumber } from "../utils/formatNumber";
import Select from "react-select";
const ModalCheckOut = ({ handleExitModalCheckout, dataCheckOut }) => {
  console.log(dataCheckOut);
  const options = [
    { value: "permata", label: "Permata" },
    { value: "bca", label: "BCA" },
    { value: "bni", label: "BNI" },
    { value: "bri", label: "BRI" },
  ];

  return (
    <>
      <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10 z-10">
        <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
          <div className="flex justify-center cursor-pointer" onClick={close}>
            <GrClose
              className="text-center scale-150 mt-5 hover:-translate-y-1 duration-300 hover:scale-[1.7]"
              onClick={handleExitModalCheckout}
            />
          </div>
          <div className="w-full">
            <div className="m-8 my-4 max-w-[400px] mx-auto">
              <div className="mb-8">
                <h1 className="mb-4 text-3xl font-extrabold text-center">
                  Place an Order
                </h1>
                <img src="datasasaas" alt="" />
              </div>
              <div className="flex justify-around items-center">
                <img
                  src={dataCheckOut.cart.productImageUrl}
                  alt={dataCheckOut.cart.productImageName}
                  className="w-[85px] h-[85px]"
                />
                <table>
                  <tbody>
                    <tr>
                      <td>Product </td>
                      <td>: {dataCheckOut.cart.productName}</td>
                    </tr>
                    <tr>
                      <td>Price </td>
                      <td>
                        : Rp {formatNumber(dataCheckOut.cart.pricePerProduct)}
                      </td>
                    </tr>
                    <tr>
                      <td>Quantity </td>
                      <td>: {dataCheckOut.quantity}</td>
                    </tr>
                    <tr>
                      <td>Total Payment </td>
                      <td>
                        : Rp{" "}
                        {formatNumber(
                          dataCheckOut.quantity *
                            dataCheckOut.cart.pricePerProduct
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td>Payment Method </td>
                      <td>
                        <Select options={options} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex justify-center mt-4">
                <button className="bg-[#EC268F] text-white px-4 py-1 rounded-lg">
                  ORDER
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalCheckOut;
