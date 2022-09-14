import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";

function LoginScreen() {
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const redirect = location.search ? location.search.split("=")[1] : "/";

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };
    useEffect(() => {
        if (userInfo) {
            navigate(redirect || "/");
        }
    }, [userInfo, navigate, redirect]);

    return (
        <FormContainer>
            <h1 className="mt-5">Sign In</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={submitHandler}>
                <div className="form-group" id="email">
                    <label>Email Address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group" id="password">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-secondary mt-2">
                    Sign In
                </button>
            </form>
            <div className="row py-3">
                <div className="col">
                    New Customer?
                    <Link
                        to={
                            redirect
                                ? `/register?redirect=${redirect}`
                                : "/register"
                        }
                    >
                        Register
                    </Link>
                </div>
            </div>
        </FormContainer>
    );
}

export default LoginScreen;
