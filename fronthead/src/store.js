import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer, productReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
    usersDetailsReducer,
    usersLoginReducer,
    usersRegisterReducer,
    usersUpdateProfileReducer,
} from "./reducers/userReducers";

import {
    orderCreateReducer,
    orderDetailsReducer,
    orderClearReducer,
} from "./reducers/orderReducer";

const reducer = combineReducers({
    productList: productListReducer,
    productId: productReducer,
    cart: cartReducer,
    userLogin: usersLoginReducer,
    userRegister: usersRegisterReducer,
    userDetails: usersDetailsReducer,
    userUpdateProfile: usersUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
});
const cartItemsFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : [];

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
    ? JSON.parse(localStorage.getItem("paymentMethod"))
    : [];

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
    },
    userLogin: { userinfo: {} },
};
const middleware = [thunk];
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
