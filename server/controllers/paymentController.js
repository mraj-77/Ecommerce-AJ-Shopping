import crypto from "crypto";
import database from "../database/db.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";

export const verifyPayment = catchAsyncErrors(async (req, res, next) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return next(
            new ErrorHandler("Missing payment verification details.", 400)
        );
    }

    // ================================
    // SIGNATURE VERIFY
    // ================================
    // Razorpay: HMAC-SHA256(order_id + "|" + payment_id, key_secret)
    // Agar ye match nahi hua, matlab request tampered/fake hai -
    // kisi ne bhi payment success hue bina hi "success" call kar diya
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature !== razorpay_signature) {
        // Payment ko Failed maark kar do taaki records me pata rahe
        await database.query(
            "UPDATE payments SET payment_status = $1 WHERE payment_intent_id = $2",
            ["Failed", razorpay_order_id]
        );

        return next(
            new ErrorHandler(
                "Payment verification failed. Invalid signature.",
                400
            )
        );
    }

    // ================================
    // SIGNATURE VALID -> PAYMENT GENUINE HAI
    // ================================
    const paymentResult = await database.query(
        `
        UPDATE payments
        SET payment_status = $1
        WHERE payment_intent_id = $2
        RETURNING order_id
        `,
        ["Paid", razorpay_order_id]
    );

    if (paymentResult.rows.length === 0) {
        return next(
            new ErrorHandler("Payment record not found.", 404)
        );
    }

    const { order_id } = paymentResult.rows[0];

    // ================================
    // ✅ FIX: orders.paid_at set karna ZAROORI hai.
    // fetchMyOrders query me "WHERE o.paid_at IS NOT NULL" filter
    // hai - agar ye field kabhi set hi nahi hui, toh payment
    // successful hone ke baad bhi order "My Orders" page pe kabhi
    // nahi dikhega.
    // ================================
    await database.query(
        `
        UPDATE orders
        SET paid_at = CURRENT_TIMESTAMP
        WHERE id = $1
        `,
        [order_id]
    );

    res.status(200).json({
        success: true,
        message: "Payment verified successfully.",
        orderId: order_id,
    });
});