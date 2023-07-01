import express from "express";
import {
  register,
  logout,
  getUser,
  login,
  verifyOtp,
  editUserProfile,
  changeUserPassword,
} from "../controllers/users.js";
import verifyToken from "../middleware/verifyToken.js";

import {
  deleteProduct,
  editProduct,
  getProduct,
  getProducts,
  newProduct,
} from "../controllers/products.js";

import { upload } from "../controllers/upload/multerConfig.js";
import {
  deleteCarts,
  getCart,
  getCarts,
  newCart,
} from "../controllers/carts.js";

const router = express.Router();

// users
router.post("/api/v1/auth/register", register);
router.post("/api/v1/auth/verifyOtp", verifyOtp);
router.post("/api/v1/auth/login", login);
router.put("/api/v1/auth/editProfile", verifyToken, upload, editUserProfile);
router.put("/api/v1/auth/changePassword", verifyToken, changeUserPassword);
router.delete("/api/v1/auth/logout", logout);
router.get("/api/v1/auth/user", verifyToken, getUser);

// products
router.get("/api/v1/products", getProducts);
router.get("/api/v1/products/:productId", getProduct);
router.post("/api/v1/products", upload, newProduct);
router.put("/api/v1/products/:productId", upload, editProduct);
router.delete("/api/v1/products/:productId", deleteProduct);

// cart
router.post("/api/v1/carts", verifyToken, newCart);
router.get("/api/v1/carts", verifyToken, getCarts);
router.get("/api/v1/carts/:cartId", verifyToken, getCart);
router.delete("/api/v1/carts/:cartId", verifyToken, deleteCarts);

export default router;
