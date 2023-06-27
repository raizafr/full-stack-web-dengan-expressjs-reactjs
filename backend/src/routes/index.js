import express from "express";
import {
  register,
  logout,
  getUser,
  login,
  verifyOtp,
  editUserProfile,
} from "../controllers/users.js";
import verifyToken from "../middleware/verifyToken.js";

import {
  deleteProduct,
  editProduct,
  getProducts,
  newProduct,
} from "../controllers/products.js";

const router = express();

// users
router.post("/api/v1/auth/register", register);
router.post("/api/v1/auth/verifyOtp", verifyOtp);
router.post("/api/v1/auth/login", login);
router.put("/api/v1/auth/editProfile", verifyToken, editUserProfile);
router.delete("/api/v1/auth/logout", logout);
router.get("/api/v1/auth/user", verifyToken, getUser);

// products
router.get("/api/v1/products", getProducts);
router.get("/api/v1/products/:productId", getProducts);
router.post("/api/v1/products", newProduct);
router.put("/api/v1/products/:productId", editProduct);
router.delete("/api/v1/products/:productId", deleteProduct);

export default router;
