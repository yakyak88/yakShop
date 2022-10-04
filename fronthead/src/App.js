import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrder from "./screens/PlaceOrder";
import OrderScreen from "./screens/OrderScreen";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { login } from "./actions/userActions";
import TestScreen from "./screens/TestScreen";
function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem("userInfo")) {
            dispatch(login());
        }
        return () => {};
    }, []);
    return (
        <Router>
            <div className="App">
                <Header></Header>
                <main className="pb-3">
                    <div className="container"></div>
                    <Routes>
                        <Route
                            path="/login"
                            element={<LoginScreen></LoginScreen>}
                        />
                        <Route
                            path="/profile"
                            element={<ProfileScreen></ProfileScreen>}
                        />
                        <Route
                            path="/register"
                            element={<RegisterScreen></RegisterScreen>}
                        />
                        <Route
                            path="/shipping"
                            element={<ShippingScreen></ShippingScreen>}
                        />
                        <Route
                            path="/payment"
                            element={<PaymentScreen></PaymentScreen>}
                        />
                        <Route
                            path="/test"
                            element={<TestScreen></TestScreen>}
                        />
                        <Route
                            path="/placeorder"
                            element={<PlaceOrder></PlaceOrder>}
                        />
                        <Route
                            path="/order/:id"
                            element={<OrderScreen></OrderScreen>}
                        />

                        <Route
                            path="/product/:id"
                            element={<ProductScreen />}
                        />
                        <Route path="/cart">
                            <Route path=":id" element={<CartScreen />} />
                            <Route path="" element={<CartScreen />} />
                        </Route>
                        <Route path="/" element={<HomeScreen />} />
                    </Routes>
                </main>
                <Footer></Footer>
            </div>
        </Router>
    );
}

export default App;
