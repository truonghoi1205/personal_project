import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import Login from "./Pages/auth/Login";
import MainLayout from "./Layout/MainLayout";
import MainLayoutAdmin from "./Layout/MainLayoutAdmin";
import Forbidden from "./Pages/403";
import PrivateRoute from "./Component/PrivateRoute";
import Signup from "./Pages/auth/SignUp";
import ForgotPassword from "./Pages/auth/ForgotPassword";
import ConfirmEmail from "./Pages/auth/ConfirmEmail";
import VerifyAccount from "./Pages/auth/VerifyAccount";
import ResetPassword from "./Pages/auth/ResetPassword";
import Error from "./Pages/404";
import store from "./Redux/store";
import {Provider} from "react-redux";
import BrandPage from "./Pages/brand/BrandPage";
import Product from "./Pages/product/Product";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/confirm-email" element={<ConfirmEmail/>}/>
                    <Route path="/verify-account" element={<VerifyAccount/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Signup/>}/>
                    <Route path="/forgot-password" element={<ForgotPassword/>}/>
                    <Route path="/reset-password" element={<ResetPassword/>}/>
                    <Route path="*" element={<Error/>}/>
                    <Route path="/" element={<MainLayout/>}/>
                    <Route path="/403" element={<Forbidden/>}/>
                    <Route path="/thuong-hieu" element={<BrandPage/>}/>
                    <Route path="/thuong-hieu/:brandName" element={<Product/>}/>
                    <Route path="/phan-loai/:categoryName" element={<Product/>}/>
                    <Route path="/san-pham" element={<Product/>}/>
                    <Route element={<PrivateRoute requiredRoles={['ROLE_ADMIN']}/>}>
                        <Route path="/admin" element={<MainLayoutAdmin/>}/>
                    </Route>
                </Routes>
                <ToastContainer/>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
