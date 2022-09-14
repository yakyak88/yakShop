import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/usersConstants";
import { getUserDetails } from "../actions/userActions";

function ProfileScreen() {
    const location = useLocation();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        } else {
            dispatch(
                updateUserProfile({ id: user._id, name, email, password })
            );
        }
    };
    useEffect(() => {
        if (!userInfo) {
            navigate("/login");
        } else {
            if (!user.name || !user || success) {
                dispatch(getUserDetails("profile"));
                dispatch({ type: USER_UPDATE_PROFILE_RESET });
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, userInfo, navigate, user, success]);

    return (
        <div className="container row">
            <div className="col-md-3 ">
                <h2 className="mt-5">User Profile</h2>
                {message && <div className="alert alert-danger">{message}</div>}
                {success && (
                    <div className="alert alert-success">Profile Updated</div>
                )}
                {error && <div className="alert alert-danger">{error}</div>}
                {loading && (
                    <div className="spinner-border" role="status"></div>
                )}

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
                    <button type="submit" className="btn btn-secondary mt-4">
                        Update
                    </button>
                </form>
            </div>
            <div className="col-md-6"> </div>
            <div className="col-md-3">
                <h2 className="mt-5">My Orders</h2>
            </div>
        </div>
    );
}

export default ProfileScreen;
