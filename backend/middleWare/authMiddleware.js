import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async function (req, res, next) {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findOne({ email: decoded.id }).select(
                "-password"
            );
            console.log(decoded);
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error("Not authorized,token failed");
        }
    }
    if (!token) {
        res.status(401);

        throw new Error("Not authorized,no token");
    }
});

export { protect };
