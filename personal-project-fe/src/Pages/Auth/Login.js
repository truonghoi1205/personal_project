import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {Link, useNavigate} from "react-router-dom";
import FormLogin from "../../Component/Auth/FormLogin";
import Helper from "../../utils/Helper";
import { setToken } from "../../Redux/auth/authSlice";
import AuthApi from "../../Apis/AuthApi"
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from "yup";

const validationSchema = Yup.object({
    email: Yup.string().email('Email không hợp lệ').required("Vui lòng nhập email!"),
    password: Yup.string().required("Vui lòng nhập mật khẩu!")
});

function Login() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate])

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            setLoading(true);
            try {
                await Helper.delay(1000);
                const res = await AuthApi.login(values);
                dispatch(setToken(res.data.token));
                navigate('/');
                Helper.toastSuccess('Đăng nhập thành công!');
            } catch (error) {
                Helper.parseError(error);
            } finally {
                setLoading(false);
                setSubmitting(false);
            }
        },
        validateOnMount: false
    });

    return (
        <section id="main-wrapper" className="vh-100 bg-body-tertiary">
            <div className="container py-5 h-100">
                <div className="row d-flex align-items-center justify-content-center h-100">
                    <div className="col-md-8 col-lg-7 col-xl-6 ">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                             className="img-fluid" alt="Sample drawing" />
                    </div>
                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                        <div className="authincation-content">
                            <div>
                                <h3 className="text-center mb-4 mt-2">Đăng Nhập</h3>
                                <FormLogin formik={formik} loading={loading} />
                                <div className="mt-2 text-center">
                                    <p>
                                        Chưa có tài khoản ?{" "}
                                        <Link to="/register"
                                            className="text-primary"
                                            style={{ cursor: 'pointer' }}
                                        >
                                            Đăng ký
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
