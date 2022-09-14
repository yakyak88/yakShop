import express from "express";
import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";
import { protect } from "../middleWare/authMiddleware.js";

const router = express.Router();

router.route("/").post(
    protect,
    asyncHandler(async (req, res) => {
        console.log(req.body);
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        } = req.body;

        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({ message: "No items in order" });
        } else {
            try {
                const order = new Order({
                    orderItems,
                    shippingAddress,
                    paymentMethod,
                    itemsPrice,
                    taxPrice,
                    shippingPrice,
                    totalPrice,
                    user: req.user._id,
                });

                const createdOrder = await order.save();
                res.status(201).json(createdOrder);
            } catch (error) {
                console.log(error);
            }
        }
    })
);

export default router;
