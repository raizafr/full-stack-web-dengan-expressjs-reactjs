import Carts from "../models/Carts.js";
import Products from "../models/Products.js";
import { Op } from "sequelize";

// controler newCart
export const newCart = async (req, res) => {
  const userId = req.userId;
  const { productId, quantity, price } = req.body;

  if (!userId || !productId || !quantity || !price) {
    return res.status(400).json({ message: "Bad request" });
  }
  try {
    const checkProduct = await Products.findByPk(productId);
    if (!checkProduct) {
      return res
        .status(404)
        .json({ message: `Product with id ${productId} not found` });
    }
    const checkCartExist = await Carts.findOne({
      where: { [Op.and]: [{ userId: userId }, { productId: productId }] },
    });

    if (checkCartExist) {
      return res
        .status(400)
        .json({ message: "Product is already in the cart" });
    }
    await Carts.create({
      userId,
      productId,
      quantity,
      price,
    });
    res.status(201).json({ message: "Added to cart" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// controller getAllCart
export const getCarts = async (req, res) => {
  try {
    const userId = req.userId;
    const getCarts = await Carts.findAll({ where: { userId: userId } });
    if (!getCarts) return res.status(400).json({ message: "Not found" });
    res.status(200).json({ message: "Cart data obtained", getCarts });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// controller getCartById
export const getCart = async (req, res) => {
  const { cartId } = req.params;
  try {
    const cart = await Carts.findByPk(cartId);
    if (!cart) return res.status(400).json({ message: "Not Found" });
    res.status(200).json({ message: "Get success", cart });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// controller delete cart
export const deleteCarts = async (req, res) => {
  const { cartId } = req.params;
  try {
    const cart = await Carts.findByPk(cartId);
    if (!cart) return res.status(404).json({ message: `${cartId} not found` });
    await cart.destroy();
    res.status(200).json({ message: "Delete success" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
