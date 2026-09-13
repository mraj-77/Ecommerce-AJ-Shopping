import express from "express";

import {
    placeNewOrder,
    fetchSingleOrder,
    fetchMyOrders,
    fetchAllOrders,
    updateOrderStatus,
    deleteOrder,
} from "../controllers/orderController.js";
import { isAuthenticated, authorizedRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ==========================================
// CREATE NEW ORDER
// ==========================================

router.post(
    "/new",
    isAuthenticated,
    placeNewOrder
);

// ==========================================
// FETCH SINGLE ORDER
// ==========================================

router.get(
    "/:orderId",
    isAuthenticated,
    fetchSingleOrder
);

// ==========================================
// FETCH LOGGED-IN USER ORDERS
// ==========================================

router.get(
    "/orders/me",
    isAuthenticated,
    fetchMyOrders
);

//==========================================
//FETCH ALL ORDERS
//==========================================

router.get(
    "/admin/getall",
    isAuthenticated,
    authorizedRoles("Admin"),
    fetchAllOrders
);

// ==========================================
// UPDATE ORDER STATUS
// ==========================================

router.put(
    "/admin/update/:orderId",
    isAuthenticated,
    authorizedRoles("Admin"),
    updateOrderStatus
);

// ==========================================
// DELETE ORDER
// ==========================================

router.delete(
    "/admin/delete/:orderId",
    isAuthenticated,
    authorizedRoles("Admin"),
    deleteOrder
);

export default router;