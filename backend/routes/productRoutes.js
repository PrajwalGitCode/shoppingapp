import express from "express";
import { getProducts, addProduct, updateProduct, deleteProduct,getMyProducts } from "../controllers/productController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getProducts);
router.post("/", protect, addProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);
router.get("/my", protect, getMyProducts);
export default router;
