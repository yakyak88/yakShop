import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { Link } from "react-router-dom";
import { createdOrder } from "../actions/orderActions";

function PlaceOrder() {
    const cart = useSelector((state) => state.cart);
    // calculate price
    cart.itemsPrice = cart.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );
    cart.shippingPrice = cart.itemsPrice > 10000 ? 0 : 10;
    cart.taxPrice = Number(cart.itemsPrice * 0.17).toFixed(2);
    cart.totalPrice = Number(
        cart.itemsPrice + cart.shippingPrice + Number(cart.taxPrice)
    ).toFixed(2);

    const orderCreate = useSelector((state) => state.orderCreate);
    const { order, success, error } = orderCreate;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (success) {
            navigate("/order/" + order._id);
        }
        // eslint-disable-next-line
    }, [success, navigate]);

    const PlaceOrderHandler = () => {
        dispatch(
            createdOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            })
        );
    };

    return (
        <>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <div className="row">
                <div className="col-md-6 ">
                    <ul className="list-group m-3 ">
                        <li className="list-item mt-1 mb-1">
                            <h1>Shipping</h1>
                            <p className="fs-5">
                                <span className="fs-3">Address :</span>{" "}
                                {cart.shippingAddress.address} -{" "}
                                {cart.shippingAddress.city} -{" "}
                                {cart.shippingAddress.postalCode} -{" "}
                                {cart.shippingAddress.country}
                            </p>
                        </li>
                    </ul>
                    <hr className="w-50" />
                    <ul className="list-group m-3">
                        <li className="list-item mt-1 mb-1">
                            <h1>Payment Method</h1>
                            <p className="fs-5">
                                <span className="fs-3">Method :</span>{" "}
                                {cart.paymentMethod.paymentMethod}
                            </p>
                        </li>
                    </ul>
                    <hr className="w-50" />
                    <ul className="list-group m-3">
                        <li className="list-item mb-3">
                            <h1>Ordered Items</h1>
                            <ul className="mt-4">
                                {cart.cartItems.map((item, index) => (
                                    <li className="group-item" key={index}>
                                        <div className="row">
                                            <div className="col-md-2">
                                                <img
                                                    className="fluid rounded placeOrderImg"
                                                    src={item.image}
                                                    alt={item.name}
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <Link
                                                    className="text-dark"
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                    to={`/product/${item.product}`}
                                                >
                                                    {item.name}
                                                </Link>
                                            </div>
                                            <div className="col-md-2 text-nowrap ">
                                                {item.qty} x {item.price}$ ={" "}
                                                {(
                                                    item.qty * item.price
                                                ).toFixed(2)}
                                                $
                                            </div>
                                        </div>
                                    </li>
                                ))}
                                <hr className="w-50" />
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="col-md-4 mt-2">
                    <div className="card ">
                        <ul className="list-group m-3">
                            <li className="list-group-item ">
                                <h4>order summary </h4>
                            </li>
                            <li className="list-group-item ">
                                <div className="row">
                                    <div className="col-md-6">
                                        <span className="fs-5">Subtotal</span>
                                    </div>
                                    <div className="col-md-6">
                                        <span className="fs-5">
                                            {cart.itemsPrice}$
                                        </span>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item ">
                                <div className="row">
                                    <div className="col-md-6">
                                        <span className="fs-5">Shipping</span>
                                    </div>
                                    <div className="col-md-6">
                                        <span className="fs-5">
                                            {cart.shippingPrice}$
                                        </span>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-md-6">
                                        <span className="fs-5">Tax</span>
                                    </div>
                                    <div className="col-md-6">
                                        <span className="fs-5">
                                            {cart.taxPrice}$
                                        </span>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-md-6">
                                        <span className="fs-5">Total</span>
                                    </div>
                                    <div className="col-md-6">
                                        <span className="fs-5">
                                            {cart.totalPrice}$
                                        </span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <ul className="list-group">
                            {" "}
                            <button
                                className="btn-block btn-lg btn btn-dark mt-2"
                                disabled={cart.cartItems.length === 0}
                                onClick={PlaceOrderHandler}
                            >
                                Place Order
                            </button>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PlaceOrder;
