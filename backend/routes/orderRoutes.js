import express from "express";
import { checkout } from "../controllers/orderController.js";
import protect  from "../middleware/authMiddleware.js"; // your auth middleware

const router = express.Router();

router.post("/", protect, checkout);

export default router;
