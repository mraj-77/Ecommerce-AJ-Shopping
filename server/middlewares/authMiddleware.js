import jwt from "jsonwebtoken";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./errorMiddleware.js";
import database from "../database/db.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Please login to access this resource.", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await database.query(
        "SELECT * FROM users WHERE id = $1 LIMIT 1",
        [decoded.id] //ye jo id hai vo jwtToken se liya gya hai
    );
    req.user = user.rows[0];

    // last_seen update karo (fire and forget, response ka wait mat karo) // ye khud se add kiya hu
    database.query(
        "UPDATE users SET last_seen = NOW() WHERE id = $1",
        [decoded.id]
    );

    next();
});

export const authorizedRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(
                    `Role: ${req.user.role} is not allowed to access this resource.`,
                    403
                )
            );
        }
        next();
    };
};