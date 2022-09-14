import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../actions/cartActions";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
function PaymentScreen() {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    const [paymentMethod, setPaymentMethod] = useState("Paypal");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    if (!shippingAddress.address) {
        return <div>Select shipping address</div>;
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            savePaymentMethod({
                paymentMethod,
            })
        );
        navigate("/placeorder");
    };

    return (
        <div>
            <FormContainer>
                <CheckoutSteps step1 step2 step3 />
                <h3 className="mt-5">choose Payment method</h3>
                <form onSubmit={submitHandler}>
                    <div class="form-check mt-4">
                        <input
                            class="form-check-input"
                            type="radio"
                            name="paymentMethod"
                            id="paypal"
                            value="Paypal"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label
                            class="form-check-label"
                            htmlFor="flexRadioDefault1"
                        >
                            Paypal
                        </label>
                    </div>
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            name="paymentMethod"
                            id="creditCard"
                            value="Credit Card"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label
                            class="form-check-label"
                            htmlFor="flexRadioDefault2"
                        >
                            Credit Card
                        </label>
                    </div>{" "}
                    <button className="btn btn-dark mt-4" type="submit">
                        Continue
                    </button>
                </form>
            </FormContainer>
        </div>
    );
}

export default PaymentScreen;
