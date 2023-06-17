import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Products from "../model/Products.js";

// controller getdata all product
export const getProducts = async (req, res) => {
  try {
    let product = await Products.findAll();
    res.status(200).json({
      message: "Get data product",
      product,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// get product by productId
export const getProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    console.log(productId);
    let product = await Products.findOne({ where: { productId: productId } });
    res.status(200).json({
      message: "Get data product",
      product,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// controller post new product
export const newProduct = async (req, res) => {
  const { productName, price, description, category, imageUrl } = req.body;

  if (!productName || !price || !description || !category || !imageUrl) {
    return res.status(400).json({ message: "bad request" });
  }
  if (isNaN(price))
    return res.status(400).json({ message: `${price} harus berisi angka` });

  try {
    const insertProduct = await Products.create({
      productName,
      price,
      description,
      category,
      imageUrl,
    });
    res.status(201).json({ message: "Product created", insertProduct });
  } catch (err) {
    res.status(500).json({ err });
  }
};

// controller edit product
export const editProduct = async (req, res) => {
  const { productId } = req.params;
  const { productName, price, description, category, imageUrl } = req.body;
  try {
    const product = await Products.findByPk(productId);
    if (!product) return res.status(404).json({ message: "product not found" });
    const updateProduct = await product.update({
      productName,
      price,
      description,
      category,
      imageUrl,
    });
    res.status(200).json({ message: "Edit success", updateProduct });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// controller delete product
export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Products.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: `${productId} not found` });
    }
    await product.destroy();
    res.status(200).json({ message: "Delete success" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
