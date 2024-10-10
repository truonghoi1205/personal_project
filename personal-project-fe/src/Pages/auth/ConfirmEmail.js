import Lottie from "lottie-react";
import {Link} from "react-router-dom";
import React from "react";
import sendMail from "../../LottieData/sendMail.json";

function ConfirmEmail() {

    return (
        <section id="main-wrapper" className="vh-100 bg-body-tertiary">
            <div className="container py-5 h-100">
                <div className="row d-flex align-items-center justify-content-center h-100">
                    <div className="col-md-8 col-lg-7 col-xl-6">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                             className="img-fluid" alt="Sample drawing"/>
                    </div>
                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                        <div id="main-wrapper" className="login-page">
                            <div className="container h-100">
                                <div className="row justify-content-center h-100 align-items-center">
                                    <div className="authincation-content">
                                        <div className="auth-form">
                                            <div className="text-center">
                                                <Lottie animationData={sendMail}/>
                                                <div style={{position: "relative", top: "-175px"}}>
                                                    <h5 className="mb-4 m-0">
                                                        Liên kết xác nhận tài khoản đã được gửi đến email của bạn.
                                                        <span> Vui lòng mở mail để kích hoạt tài khoản!</span></h5>
                                                    <Link to="/login" className="btn btn-primary">Đăng nhập ngay</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ConfirmEmail;
