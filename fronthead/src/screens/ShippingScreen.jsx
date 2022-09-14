import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cartActions";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingScreen() {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            saveShippingAddress({
                address,
                city,
                postalCode,
                country,
            })
        );
        navigate("/payment");
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <h1 className="mt-5">Shipping</h1>
            <form onSubmit={submitHandler}>
                <div className="form-group mb-2" id="address">
                    <label>Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        required="required"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="form-group mb-2" id="city">
                    <label>City</label>
                    <input
                        type="text"
                        required="required"
                        className="form-control"
                        id="city"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <div className="form-group mb-2" id="postalCode">
                    <label>Postal Code</label>
                    <input
                        required="required"
                        type="text"
                        className="form-control "
                        id="postalCode"
                        placeholder="Enter postal code"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                </div>
                <div className="form-group" id="country">
                    <label>Country</label>
                    <input
                        required="required"
                        type="text"
                        className="form-control"
                        id="country"
                        placeholder="Enter country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-dark mt-4">
                    Continue
                </button>
            </form>
        </FormContainer>
    );
}

export default ShippingScreen;
