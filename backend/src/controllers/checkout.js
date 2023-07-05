import Checkout from "../models/Checkout.js";

export const newCheckOut = async (req, res) => {
  const userId = req.userId;
  const { product, quantity, pricePerProduct, bank } = req.body;
  if (!product || !quantity || !pricePerProduct || !bank) {
    return res.status(400).json({ message: "Bad request" });
  }
  try {
    const checkout = await Checkout.create({
      userId,
      bank,
      product,
      quantity,
      pricePerProduct,
      totalPrice: pricePerProduct * quantity,
    });
    res.status(201).json({ checkout });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
