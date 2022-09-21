import React from "react";
import Product from "../components/Product";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Carousel from "../components/Carousel";
import BannerVid from "../components/BannerVid";

const HomeScreen = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <>
            <Carousel className="mb-4" product={products}></Carousel>
            <div className="container">
                {loading ? (
                    <Loader></Loader>
                ) : error ? (
                    <h3>{error}</h3>
                ) : (
                    <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 mt- ">
                        {products.map((product) => (
                            <Product
                                key={product._id}
                                product={product}
                            ></Product>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default HomeScreen;
