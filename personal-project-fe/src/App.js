import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./Pages/Auth/Login";
import MainLayout from "./Layout/MainLayout";
import MainLayoutAdmin from "./Layout/MainLayoutAdmin";
import Forbidden from "./Pages/403";
import PrivateRoute from "./Component/PrivateRoute";
import Signup from "./Pages/Auth/SignUp";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import ConfirmEmail from "./Pages/Auth/ConfirmEmail";
import VerifyAccount from "./Pages/Auth/VerifyAccount";
import ResetPassword from "./Pages/Auth/ResetPassword";
import NotFound from "./Pages/404";
import store from "./Redux/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import Brand from "./Pages/Brand/Brand";
import Product from "./Pages/Product/Product";
import Order from "./Component/admin/order/Order";
import Customer from "./Component/admin/customer/Customer";
import Shipping from "./Component/admin/shipping/Shipping";
import ProductAdmin from './Pages/Admin/Product/Product';
import Overview from "./Pages/Admin/Overview";
import ProductNew from "./Pages/Admin/Product/ProductNew";
import ProductEdit from "./Pages/Admin/Product/ProductEdit";
import ProductDetail from "./Pages/Product/ProductDetail";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import CheckOut from "./Pages/CheckOut/CheckOut";
import { fetchUser } from "./Redux/auth/authSlice";
import { useEffect } from "react";

function App() {
    const dispatch = useDispatch();
    const { status, token } = useSelector(state => state.auth);

    useEffect(() => {
        if (token !== null) {
            dispatch(fetchUser());
        }
    }, [dispatch, token]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/confirm-email" element={<ConfirmEmail />} />
                <Route path="/verify-account" element={<VerifyAccount />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/403" element={<Forbidden />} />
                    <Route path="/brands" element={<Brand />} />
                    <Route path="/product/:slug" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<CheckOut />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
                <Route path="/products" element={<Product />} />
                <Route path="/products/brand/:brandName" element={<Product />} />
                <Route path="/products/category/:categoryName" element={<Product />} />
                <Route element={<PrivateRoute requiredRoles={['ROLE_ADMIN']} />}>
                    <Route path="/admin" element={<MainLayoutAdmin />}>
                        <Route path="overview" element={<Overview />} />
                        <Route path="orders" element={<Order />} />
                        <Route path="shipping" element={<Shipping />} />
                        <Route path="products" element={<ProductAdmin />} />
                        <Route path="products/new" element={<ProductNew />} />
                        <Route path="products/update/:id" element={<ProductEdit />} />
                        <Route path="customers" element={<Customer />} />
                    </Route>
                </Route>
            </Routes>
            <ToastContainer />
        </BrowserRouter>
    );
}

export default App;
