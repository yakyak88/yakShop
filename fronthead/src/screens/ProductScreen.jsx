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
    useEffect(() => {
        dispatch(getProductByID(id));
    }, [dispatch]);

    const navigate = useNavigate();
    const addToCartHandler = () => {
        navigate(`/cart/${id}?quantity=${qty}`);
    };

    const { id } = useParams();

    return (
        <>
            <div className="container">
                <Link to={"/"}>
                    <button type="button" className="btn btn-dark btn-lg my-3">
                        Go Back
                    </button>
                </Link>
                <div className="row overflow-hidden">
                    <div className="col-lg-6 col-sm-12">
                        <img className="img-fluid" src={product.image} alt="" />
                    </div>

                    <div className=" col-lg-5 col-sm-12 mx-auto my-auto">
                        <h3 className="text-warning mb-5">{product.name}</h3>
                        <h5>brand: {product.brand}</h5>
                        {product.countInStock ? (
                            <select
                                className="form-select my-3"
                                aria-label="Default select example"
                                onChange={(e) => setQty(e.target.value)}
                            >
                                <option>Select a quantity :</option>
                                {[...Array(product.countInStock).keys()].map(
                                    (x) => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                    )
                                )}
                            </select>
                        ) : (
                            <h5 style={{ color: "red" }}>Out of stock</h5>
                        )}

                        <h5>category: {product.category}</h5>
                        <h5>price: {product.price}</h5>
                        <h6 className="my-3"> {product.description}</h6>
                        <h5>
                            <Rating
                                value={product.rating}
                                reviews={product.numReviews}
                            ></Rating>
                        </h5>
                        <div className="d-grid gap-2">
                            <button
                                disabled={product.countInStock < 1}
                                className="btn btn-lg btn-dark mt-5  "
                                type="button"
                                onClick={addToCartHandler}
                            >
                                {product.countInStock > 0
                                    ? "Add to cart"
                                    : "out of stock"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default ProductScreen;
