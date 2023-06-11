const express = require("express");
const { register, login, getUser, logout } = require("../controllers/users");
const verifyToken = require("../middleware/verifyToken");
const {
  newProduct,
  getAllProduct,
  editProduct,
  getProduct,
} = require("../controllers/products");

const router = express();

// users
router.post("/api/v1/auth/register", register);
router.post("/api/v1/auth/login", login);
router.delete("/api/v1/auth/logout", logout);
router.get("/api/v1/auth/user", verifyToken, getUser);

// products
router.get("/api/v1/products", getAllProduct);
router.get("/api/v1/product/:productId", getProduct);
router.post("/api/v1/product", newProduct);
router.put("/api/v1/product/:productId", editProduct);

module.exports = router;
