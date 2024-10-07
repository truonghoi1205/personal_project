import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthApi from "../../Apis/AuthApi";


const VerifyAccount = () => {
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const [countdown, setCountdown] = useState(1000); // Thêm state cho countdown
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    console.log(token);

    useEffect(() => {
        if (token) {
            AuthApi.confirmAccount(token)
                .then(response => {
                    setSuccess(true);
                    setMessage('Tài khoản đã được xác minh thành công!');
                })
                .catch(error => {
                    setSuccess(false);
                    setMessage(error.response?.data || 'Có lỗi xảy ra!');
                })
                .finally(() => {
                    setLoading(false);
                    const timer = setInterval(() => {
                        setCountdown(prevCountdown => prevCountdown - 1);
                    }, 1000);

                    setTimeout(() => {
                        navigate(`/login`);
                    }, 3000000);

                    return () => clearInterval(timer);
                });
        } else {
            setSuccess(false);
            setMessage('Mã xác thực không hợp lệ!');
            setLoading(false);
        }
    }, []);


    if (loading) {
        return <div className="text-center mt-5">Đang xử lý...</div>;
    }

    return (
        <div className="container text-center mt-5">
            <div>
                <h2 className="alert-heading mt-3">{success ? 'Thành công!' : 'Lỗi!'}</h2>
                <p className="text-center mt-1">{message}</p>
                <p className="text-center mt-5">
                    Trang sẽ được chuyển hướng về trang đăng nhập sau {countdown} giây...
                </p>
            </div>
        </div>
    );
};

export default VerifyAccount;
