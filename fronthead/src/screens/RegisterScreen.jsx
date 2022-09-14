import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";

function RegisterScreen() {
    const location = useLocation();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const dispatch = useDispatch();
    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    const redirect = location.search ? location.search.split("=")[1] : "/";

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        } else {
            dispatch(register(name, email, password));
        }
    };
    useEffect(() => {
        if (userInfo) {
            navigate(redirect || "/");
        }
    }, [userInfo, navigate, redirect]);

    return (
        <FormContainer>
            <h1 className="mt-5">Sign UP</h1>
            {message && <div className="alert alert-danger">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            {loading && <div className="spinner-border" role="status"></div>}

            <form onSubmit={submitHandler}>
                <div className="form-group" id="email">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
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
                <div className="form-group" id="password">
                    <label>Confirm Password</label>
                    <input
                        type="Password"
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Enter confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-secondary mt-2">
                    Register
                </button>
            </form>
            <div className="row py-3">
                <div className="col">
                    Have an account?
                    <Link
                        to={redirect ? `/login?redirect=${redirect}` : "/login"}
                    >
                        Login
                    </Link>
                </div>
            </div>
        </FormContainer>
    );
}

export default RegisterScreen;
