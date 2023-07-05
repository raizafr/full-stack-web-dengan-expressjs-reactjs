import midtransClient from "midtrans-client";
import Checkout from "../models/Checkout.js";
import Orders from "../models/Orders.js";

// Create Core API / Snap instance (both have shared `transactions` methods)
let core = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: "SB-Mid-server-u-5HAp1P0VALZZ1Lih_5I6QG",
  clientKey: "SB-Mid-client-nA1oL0s7f85DwxS9",
});

export const newOder = async (req, res) => {
  try {
    const { checkoutId } = req.body;
    const checkout = await Checkout.findByPk(checkoutId);
    if (!checkout) return res.status(404).json({ message: "Not found" });
    const userId = checkout.dataValues.userId;
    const timestamp = Date.now().toString();
    let parameter = {
      payment_type: "bank_transfer",
      transaction_details: {
        gross_amount: checkout.dataValues.totalPrice,
        order_id: `${userId}_${timestamp}`,
      },
      bank_transfer: {
        bank: checkout.dataValues.bank,
      },
    };

    core
      .charge(parameter)
      .then((chargeResponse) => {
        Orders.create({
          price: chargeResponse.gross_amount,
          responseMidtrans: JSON.stringify(chargeResponse),
        });
        checkout.destroy();
        res.status(201).json({ message: "ok" });
      })
      .catch((e) => {
        console.log("Error occured:", e);
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
