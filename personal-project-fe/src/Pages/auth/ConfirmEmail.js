import {Link} from "react-router-dom";

function ConfirmEmail() {

    return (
        <div id="main-wrapper" className="login-page">
            <div className="container h-100">
                <div className="row justify-content-center h-100 align-items-center">
                    <div className="col-md-6">
                        <div className="authincation-content">
                            <div className="auth-form">
                                <div className="text-center">
                                    <h3 className={"mb-5"}>Liên kết xác nhận tài khoản đã được gửi đến email của bạn, vui lòng xác nhận!</h3>
                                    <Link to={"/login"} className="btn btn-primary">Đăng nhập ngay</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmEmail;