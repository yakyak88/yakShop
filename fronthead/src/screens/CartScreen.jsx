import { useEffect } from "react";
import { addToCart, removeFromCart } from "../actions/cartActions";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";

function CartScreen() {
    const location = useLocation();
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const qty = location.search ? Number(location.search.split("=")[1]) : 1;

    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, qty));
        }
    }, [dispatch, qty, id]);

    const checkoutHandler = () => {
        navigate("/shipping");
    };
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    return (
        <div className="row  m-4">
            <ul className=" list-group col-md-8 mt-2">
                <h1 className="mb-5">Shopping Cart</h1>
                {cartItems.map((item) => (
                    <li className="group-item">
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
                                    style={{ textDecoration: "none" }}
                                    to={`product/${item.product}`}
                                >
                                    {item.name}
                                </Link>
                            </div>
                            <div className="col-md-2">{item.price}$</div>
                            <div className="col-md-2">
                                {item.countInStock && (
                                    <select
                                        className="form-select "
                                        value={item.qty}
                                        aria-label="Default select example"
                                        onChange={(e) =>
                                            dispatch(
                                                addToCart(
                                                    item.product,
                                                    Number(e.target.value)
                                                )
                                            )
                                        }
                                    >
                                        <option>Select a quantity :</option>
                                        {[
                                            ...Array(item.countInStock).keys(),
                                        ].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                            <div className="col-md-2">
                                <button
                                    type="button"
                                    className="btn-btn-light"
                                    onClick={() =>
                                        removeFromCartHandler(item.product)
                                    }
                                >
                                    <i class="bi bi-trash-fill text-dark"></i>
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="col-md-4 mt-2">
                <div className="card">
                    <ul className="list-group m-3">
                        <li className="list-item mb-3">
                            <h3>
                                subtotal (
                                {cartItems.reduce(
                                    (acc, item) => acc + item.qty,
                                    0
                                )}
                                ) items
                            </h3>
                            $
                            {cartItems
                                .reduce(
                                    (acc, item) => acc + item.price * item.qty,
                                    0
                                )
                                .toFixed(2)}
                        </li>
                    </ul>
                    <ul className="list-group">
                        {" "}
                        <button
                            className="btn-block btn-lg btn btn-dark mt-2"
                            onClick={checkoutHandler}
                        >
                            Proceed To Checkout
                        </button>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CartScreen;
