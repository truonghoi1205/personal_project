import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from './Redux/store';
import Login from "./Pages/auth/Login";
import MainLayout from "./Layout/MainLayout";
import MainLayoutAdmin from "./Component/admin/MainLayoutAdmin";
import Forbidden from "./Pages/403";
import PrivateRoute from "./Component/PrivateRoute";
import Signup from "./Pages/auth/SignUp";
import ForgotPassword from "./Pages/auth/ForgotPassword";
import ConfirmEmail from "./Pages/auth/ConfirmEmail";
import VerifyAccount from "./Pages/auth/VerifyAccount";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/confirm-email" element={<ConfirmEmail/>}/>
                    <Route path="/verify-account" element={<VerifyAccount/>}/>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Signup />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/" element={<MainLayout />} />
                    <Route path="/403" element={<Forbidden />} />

                    <Route element={<PrivateRoute requiredRole="ROLE_ADMIN" />}>
                        <Route path="/admin" element={<MainLayoutAdmin />} />
                    </Route>
                </Routes>
                <ToastContainer />
            </BrowserRouter>
        </Provider>
    );
}

export default App;
