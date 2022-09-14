import React from "react";
import Rating from "../components/Rating";
import { Link, link } from "react-router-dom";

const Product = ({ product }) => {
    return (
        <div>
            <div className="card " style={{ width: "18rem" }}>
                <Link to={`product/${product._id}`}>
                    <img
                        className="card-img-top"
                        src={product.image}
                        alt="Card image cap"
                    />
                </Link>
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.brand}</p>
                    <p className="card-text">{product.price}$</p>
                    <Rating
                        value={product.rating}
                        reviews={product.numReviews}
                    ></Rating>
                    <a href="#" className="btn btn-dark">
                        Add To Cart
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Product;
