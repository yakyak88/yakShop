import express from "express";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utills/generateToken.js";

import { protect } from "../middleWare/authMiddleware.js";
import JWT from "jsonwebtoken";
const router = express.Router();

router.post(
    "/",
    asyncHandler(async (req, res) => {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error("User already exists");
        }
        const user = await User.create({
            name,
            email,
            password,
        });
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user.email),
            });
        } else {
            res.status(400);
            throw new Error("invalid user data");
        }
    })
);
router.post(
    "/login",
    asyncHandler(async (req, res) => {
        let user,
            passwordMatched = true;
        const { email, password } = req.body;
        const token = req.headers.authorization.replace("Bearer ", "");

        if (token !== "undefined" && !email) {
            JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.status(401);
                    throw new Error("Invalid token");
                }
                user = decoded;
            });

            user = await User.findOne({
                email: user.id,
            });

            if (!user) {
                res.redirect("/login");
            } else {
                res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user.email),
                });
            }
        } else {
            user = await User.findOne({ email });

            if (user && user.matchPassword(password)) {
                res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user.email),
                });
            } else {
                res.status(400);
                throw new Error("Invalid email or password");
            }
        }
    })
);

router.route("/profile").get(
    protect,
    asyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id);

        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            });
        } else {
            res.status(404);
            throw new Error("User not found");
        }
    })
);
router.route("/profile").put(
    protect,
    asyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if (req.body.password) {
                user.password = req.body.password;
            }
            const updatedUser = await user.save();
            res.json({
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
            });
        } else {
            res.status(404);
            throw new Error("User not found");
        }
    })
);

export default router;
