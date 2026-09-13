import express from "express";
import { verifyPayment } from "../controllers/paymentController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/verify", isAuthenticated, verifyPayment);

export default router;