import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductByID } from "../actions/productActions";
import { useState } from "react";
const ProductScreen = () => {
    const [qty, setQty] = useState(1);

    const dispatch = useDispatch();
    const singleProduct = useSelector((state) => state.productId);
    const { loading, error, product } = singleProduct;
    const { id } = useParams();
    useEffect(() => {
        dispatch(getProductByID(id));
    }, [dispatch]);

    const navigate = useNavigate();
    const addToCartHandler = () => {
        navigate(`/cart/${id}?quantity=${qty}`);
    };

    return (
        <>
            <p>test</p>
        </>
    );
};
export default ProductScreen;
