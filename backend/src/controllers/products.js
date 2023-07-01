import Products from "../models/Products.js";
import fs from "fs";
// controller getdata all product
export const getProducts = async (req, res) => {
  try {
    let products = await Products.findAll();

    res.status(200).json({
      message: "Get data product",
      products,
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
    if (!product) {
      return res
        .status(404)
        .json({ message: `Product with id ${productId} not found` });
    }

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
  const { productName, price, description, category } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "No have image selected" });
  }
  const imageName = req.file.filename;
  const imageUrl = `${process.env.HOSTNAME}/${req.file.path}`;

  if (!productName || !price || !description || !category) {
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
      imageName,
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
  const { productName, price, description, category } = req.body;
  let imageName = null;
  let imageUrl = null;

  try {
    const product = await Products.findByPk(productId);
    if (!product) return res.status(404).json({ message: "product not found" });
    if (req.file) {
      imageName = req.file.filename;
      imageUrl = `${process.env.HOSTNAME}/${req.file.path}`;
      fs.unlink(`public/images/${product.dataValues.imageName}`, (err) => {});
    } else {
      imageName = product.dataValues.imageName;
      imageUrl = product.dataValues.imageUrl;
    }

    const updateProduct = await product.update({
      productName,
      price,
      description,
      category,
      imageName,
      imageUrl,
    });
    res.status(200).json({ message: "Edit success", edit: updateProduct });
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
    const oldImage = product.dataValues.imageUrl;
    await product.destroy();
    fs.unlink(`public/images/${product.dataValues.imageName}`, (err) => {});
    res.status(200).json({ message: "Delete success" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
