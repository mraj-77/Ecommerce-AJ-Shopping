import database from "../database/db.js";
import { razorpay } from "./razorpayInstance.js";

export async function generatePaymentIntent(orderId, totalPrice) {
    try {
        const options = {
            amount: totalPrice * 100, // Razorpay paise me leta hai (INR)
            currency: "INR",
            receipt: `order_rcptid_${orderId}`,
        };

        const razorpayOrder = await razorpay.orders.create(options);

        await database.query(
            "INSERT INTO payments (order_id, payment_type, payment_status, payment_intent_id) VALUES ($1, $2, $3, $4) RETURNING *",
            [orderId, "Online", "Pending", razorpayOrder.id]
        );

        return {
            success: true,
            orderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            key: process.env.RAZORPAY_KEY_ID,
        };
    } catch (error) {
        console.error("Payment Error:", error.message || error);
        return { success: false, message: "Payment Failed." };
    }
}