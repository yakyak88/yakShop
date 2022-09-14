import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../actions/userActions";

const Header = () => {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const navigate = useNavigate();
    const logoutHandler = () => {
        dispatch(logout());
        navigate("/login");
    };
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={"/"}>
                        Yak_Shop
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarColor01"
                        aria-controls="navbarColor01"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="navbarColor01"
                    >
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={"/cart"}>
                                    <i className="fas fa-shopping-cart"></i>{" "}
                                    Cart
                                </Link>
                            </li>
                            {userInfo ? (
                                <div className="dropdown">
                                    <button
                                        className="btn btn-dark dropdown-toggle"
                                        type="button"
                                        id="dropdownMenuButton1"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {userInfo.name}
                                    </button>
                                    <ul
                                        className="dropdown-menu"
                                        aria-labelledby="dropdownMenuButton1"
                                    >
                                        <Link
                                            to={"/profile"}
                                            className="dropdown-item"
                                        >
                                            <li>
                                                <a>Profile</a>
                                            </li>
                                        </Link>
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                onClick={logoutHandler}
                                            >
                                                Log Out
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/login"}>
                                        <i className="fas fa-user"></i> Sign In
                                    </Link>
                                </li>
                            )}
                        </ul>
                        <form className="d-flex"></form>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;
