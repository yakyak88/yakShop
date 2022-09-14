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

function App() {
    return (
        <Router>
            <div className="App">
                <Header></Header>
                <main className="py-3">
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
                            path="/placeorder"
                            element={<PlaceOrder></PlaceOrder>}
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
