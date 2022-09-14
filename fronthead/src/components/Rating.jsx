import React from "react";

const rating = ({ value, reviews }) => {
    return (
        <div className="rating mb-2">
            {
                <>
                    <i
                        className={
                            value >= 1
                                ? "fa fa-star"
                                : value >= 0.5
                                ? "fas fa-star-half-alt"
                                : "far fa-star"
                        }
                    ></i>
                    <i
                        className={
                            value >= 2
                                ? "fa fa-star"
                                : value >= 1.5
                                ? "fas fa-star-half-alt"
                                : "far fa-star"
                        }
                    ></i>
                    <i
                        className={
                            value >= 3
                                ? "fa fa-star"
                                : value >= 2.5
                                ? "fas fa-star-half-alt"
                                : "far fa-star"
                        }
                    ></i>
                    <i
                        className={
                            value >= 4
                                ? "fa fa-star"
                                : value >= 3.5
                                ? "fas fa-star-half-alt"
                                : "far fa-star"
                        }
                    ></i>
                    <i
                        className={
                            value >= 5
                                ? "fa fa-star"
                                : value >= 4.5
                                ? "fas fa-star-half-alt"
                                : "far fa-star"
                        }
                    ></i>
                    <span> {`${reviews} reviews`}</span>
                </>
            }
        </div>
    );
};

export default rating;
