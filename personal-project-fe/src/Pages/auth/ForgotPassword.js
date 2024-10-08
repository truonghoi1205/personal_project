import { Link } from "react-router-dom";
import React, { useState } from "react";
import AuthApi from "../../Apis/AuthApi";
import Helper from "../../utils/Helper";
import sendMail from "../../LottieData/sendMail.json";
import Lottie from "lottie-react";

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        if (!isValidEmail(email)) {
            setErrorMessage('Email không hợp lệ');
            setIsLoading(false);
            return;
        }
        try {
            await AuthApi.forgotPassword(email);
            setSent(true);
        } catch (error) {
            console.error(error);
            Helper.toastError(error.response.data);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="main-wrapper" className="vh-100 bg-body-tertiary">
            <div className="container py-5 h-100">
                <div className="row d-flex align-items-center justify-content-center h-100">
                    <div className="col-md-8 col-lg-7 col-xl-6 ">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                             className="img-fluid" alt="Sample drawing"/>
                    </div>
                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                        {sent ? (
                            <div className="p-4 text-center">
                                <Lottie animationData={sendMail}/>
                                <div style={{position: "relative", top: "-150px"}}>
                                    <h4 className="mb-3">Email đặt lại mật khẩu đã được gửi, vui lòng kiểm tra email của
                                        bạn!</h4>
                                    <Link to={"/login"} className="btn btn-primary ms-2 mt-2">Quay lại trang đăng nhập</Link>
                                </div>
                            </div>
                        ) : (
                            <div className="auth-form">
                                <h3 className="text-center mb-4 mt-2">Khôi Phục Mật Khẩu</h3>
                                <form onSubmit={handleSubmit} className="w-75 m-auto">
                                    <div className="mb-3 ">
                                        <label className="">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Nhập email của bạn"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        {errorMessage && <p className="text-danger text-start">{errorMessage}</p>}
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-primary btn-block w-25" disabled={isLoading}>
                                            {isLoading ? (
                                                <div className="spinner-border spinner-border-sm" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            ) : (
                                                'Gửi'
                                            )}
                                        </button>
                                    </div>
                                </form>
                                <div className="new-account mt-3 w-75 m-auto">
                                    <p>
                                        Chưa có tài khoản?{" "}
                                        <Link to={"/register"} className="text-primary">
                                            Đăng ký
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ForgotPassword;
