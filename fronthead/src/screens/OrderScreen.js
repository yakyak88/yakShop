import React from "react";
import { clearOrder, getOrderDetails } from "../actions/orderActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import Loader from "../components/Loader";

function OrderScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const orderDetailsState = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetailsState;
    const { id } = useParams();
    useEffect(() => {
        return () => {
            dispatch(clearOrder());
        };
    }, []);

    useEffect(() => {
        dispatch(getOrderDetails(id));
    }, [dispatch, id]);
    return loading ? (
        <Loader></Loader>
    ) : error ? (
        <div>{error}</div>
    ) : (
        <div>
            <div className="row top">
                <ul>
                    <li className="alert alert-success col-3 mx-4">
                        ✔ Order confirmed
                    </li>
                </ul>
                <div className="col-6 mx-4">
                    <ul className="list-group">
                        <li className="card card-body">
                            <h3>Order ID: {order._id}</h3>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h3>Shipping</h3>
                                <p>
                                    <strong>Name:</strong> {order.user.name}{" "}
                                    <br />
                                    <strong>Address:</strong>{" "}
                                    {order.shippingAddress.address},{" "}
                                    {order.shippingAddress.city},{" "}
                                    {order.shippingAddress.postalCode},{" "}
                                    {order.shippingAddress.country}
                                </p>
                                {order.isDelivered ? (
                                    <div className="success">
                                        Delivered at {order.deliveredAt}
                                    </div>
                                ) : (
                                    <div className="alert alert-danger">
                                        Not Delivered
                                    </div>
                                )}
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h3>Payment Method</h3>
                                <p>
                                    <strong>Method:</strong>{" "}
                                    {order.paymentMethod.paymentMethod} <br />
                                </p>
                                {order.isPaid ? (
                                    <div className="success">
                                        Paid at {order.createdAt}
                                    </div>
                                ) : (
                                    <div className="alert alert-danger">
                                        Not Paid
                                    </div>
                                )}
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h3>Order Items</h3>

                                <ul>
                                    {order.orderItems.map((item) => (
                                        <li
                                            key={item.product}
                                            className="group-item mt-2"
                                        >
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <img
                                                        className="fluid rounded cartImg"
                                                        src={item.image}
                                                        alt={item.name}
                                                    />
                                                </div>
                                                <div className="col-md-3">
                                                    <Link
                                                        className="text-dark"
                                                        style={{
                                                            textDecoration:
                                                                "none",
                                                        }}
                                                        to={`/product/${item.product}`}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </div>
                                                <div className="col-md-2 text-nowrap">
                                                    {item.price}$ x {item.qty} =
                                                    {item.price * item.qty}$
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1"></div>
                <div className="col-4">
                    <div className="card ">
                        <ul className="list-group">
                            <li className="card card-body">
                                <h2>Order Summary</h2>
                            </li>
                            <li className="card card-body">
                                <div className="row">
                                    <div>Items Price</div>
                                    <div>${order.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li className="card card-body">
                                <div className="row">
                                    <div>Shipping Price</div>
                                    <div>${order.shippingPrice}</div>
                                </div>
                            </li>
                            <li className="card card-body">
                                <div className="row">
                                    <div>Tax Price</div>
                                    <div>${order.taxPrice}</div>
                                </div>
                            </li>
                            <li className="card card-body fs-5">
                                <div className="row">
                                    <div>
                                        <strong>Total Order Price</strong>
                                    </div>
                                    <div>
                                        <strong>${order.totalPrice}</strong>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderScreen;
