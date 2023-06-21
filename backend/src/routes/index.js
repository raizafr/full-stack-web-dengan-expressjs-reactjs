import express from "express";
import {
  register,
  logout,
  getUser,
  login,
  verifyOtp,
} from "../controllers/users.js";
import verifyToken from "../middleware/verifyToken.js";
import {
  getAdmin,
  loginAdmin,
  logoutAdmin,
  registerAdmin,
} from "../controllers/admins.js";
import verifyTokenAdmin from "../middleware/verifyTokenAdmin.js";
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
router.delete("/api/v1/auth/logout", logout);
router.get("/api/v1/auth/user", verifyToken, getUser);

// admins
router.post("/api/v1/auth/admin/register", registerAdmin);
router.post("/api/v1/auth/admin/login", loginAdmin);
router.delete("/api/v1/auth/admin/logout", logoutAdmin);
router.get("/api/v1/auth/admin", verifyTokenAdmin, getAdmin);

// products
router.get("/api/v1/products", getProducts);
router.get("/api/v1/products/:productId", getProducts);
router.post("/api/v1/products", newProduct);
router.put("/api/v1/products/:productId", editProduct);
router.delete("/api/v1/products/:productId", deleteProduct);

export default router;
