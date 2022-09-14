import React from "react";
import { Link } from "react-router-dom";

function CheckoutSteps({ step1, step2, step3, step4 }) {
    return (
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                {step1 ? (
                    <Link to="/login" className=" text-decoration-none">
                        <li className="mx-3 nav-link px-2 link-dark fw-bold">
                            Sign In
                        </li>
                    </Link>
                ) : (
                    <Link disabled>Sign in</Link>
                )}
                {step2 ? (
                    <Link to="/shipping" className=" text-decoration-none">
                        <li className="mx-3 nav-link px-2 link-dark fw-bold">
                            shipping
                        </li>
                    </Link>
                ) : (
                    <p>shipping</p>
                )}
                {step3 ? (
                    <Link to="/payment" className=" text-decoration-none">
                        <li className="mx-3 nav-link px-2 link-dark fw-bold">
                            Payment
                        </li>
                    </Link>
                ) : (
                    <p className="mx-3 nav-link px-2 link-secondary">Payment</p>
                )}
                {step4 ? (
                    <Link to="/placeholder" className=" text-decoration-none">
                        <li className="mx-3 nav-link px-2 link-dark fw-bold">
                            Place order
                        </li>
                    </Link>
                ) : (
                    <p className="mx-3 nav-link px-2 link-secondary">
                        Place order{" "}
                    </p>
                )}
            </ul>
        </div>
    );
}

export default CheckoutSteps;
