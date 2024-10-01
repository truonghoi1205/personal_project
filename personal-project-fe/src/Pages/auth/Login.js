import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {useNavigate} from "react-router-dom";
import FormLogin from "../../Component/auth/FormLogin";
import Helper from "../../utils/Helper";
import {setToken} from "../../Redux/auth/authSlice";
import AuthApi from "../../Apis/AuthApi"
import {Modal} from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from "yup";
import Signup from "./SignUp";

const validationSchema = Yup.object({
    email: Yup.string().email('Email không hợp lệ').required("Vui lòng nhập email!"),
    password: Yup.string().required("Vui lòng nhập mật khẩu!")
});

function Login() {
    const [showSignUpModal, setShowSignUpModal] = useState(false); // State to handle modal visibility
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);

    if (token) {
        navigate('/');
    }

    const formik = useFormik({
        initialValues: {email: '', password: ''},
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values, {setSubmitting}) => {
            try {
                const res = await AuthApi.login(values);
                dispatch(setToken(res.data.accessToken));
                navigate('/');
                Helper.toastSuccess('Đăng nhập thành công!');
            } catch (error) {
                Helper.parseError(error);
            }
        },
        validateOnMount: false
    });

    const handleSignUpClick = () => {
        setShowSignUpModal(true);
    };

    const handleSignUpClose = () => {
        setShowSignUpModal(false);
    };

    return (
        <section id="main-wrapper" className="vh-100 bg-body-tertiary">
            <div className="container py-5 h-100">
                <div className="row d-flex align-items-center justify-content-center h-100">
                    <div className="col-md-8 col-lg-7 col-xl-6 ">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                             className="img-fluid" alt="Sample image"/>
                    </div>
                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                        <div className="authincation-content">
                            <div>
                                <h3 className="text-center mb-4 mt-2">Đăng Nhập</h3>
                                <FormLogin formik={formik}/>
                                <div className="mt-2 text-center">
                                    <p>
                                        Chưa có tài khoản ?{" "}
                                        <span
                                            onClick={handleSignUpClick}
                                            className="text-primary"
                                            style={{cursor: 'pointer'}}
                                        >
                                            Đăng ký
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showSignUpModal} onHide={handleSignUpClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Đăng ký tài khoản</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Signup/>
                </Modal.Body>
            </Modal>
        </section>
    );
}

export default Login;
