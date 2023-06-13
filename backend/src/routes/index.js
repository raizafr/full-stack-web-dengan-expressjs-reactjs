import express from "express";
import { register, logout, getUser, login } from "../controllers/users.js";
import verifyToken from "../middleware/verifyToken.js";

// const {
//   newProduct,
//   getAllProduct,
//   editProduct,
//   getProduct,
// } = require("../controllers/products");

const router = express();

// users
router.post("/api/v1/auth/register", register);
router.post("/api/v1/auth/login", login);
router.delete("/api/v1/auth/logout", logout);
router.get("/api/v1/auth/user", verifyToken, getUser);

// products
// router.get("/api/v1/products", getAllProduct);
// router.get("/api/v1/products/:productId", getProduct);
// router.post("/api/v1/products", newProduct);
// router.put("/api/v1/products/:productId", editProduct);

export default router;
