import React, {useEffect, useState} from "react"; // Chỉnh sửa để sử dụng useEffect
import {Link, useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {useSelector} from "react-redux";
import {useFormik} from "formik";
import Helper from "../../utils/Helper";
import FormSignUp from "../../Component/auth/FormSignUp";
import AuthApi from "../../Apis/AuthApi";
import FormLogin from "../../Component/auth/FormLogin";

const validationSchema = Yup.object({
    email: Yup.string().email("Vui lòng nhập email!").required("Vui lòng nhập email!"),
    password: Yup.string().required("Vui lòng nhập mật khẩu!"),
    name: Yup.string().required("Vui lòng nhập họ và tên!"),
    confirmPassword: Yup.string()
        .required("Xác nhận mật khẩu phải nhập!")
        .oneOf([Yup.ref('password'), null], "Mật khẩu xác nhận không trùng với mật khẩu mới")
});

function Signup() {
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (token) {
            navigate('/login');
        }
    }, [token, navigate]);

    const formik = useFormik({
        initialValues: {email: '', password: '', name: '', confirmPassword: ''},
        validationSchema,
        onSubmit: async (values, {setSubmitting}) => {
            setIsLoading(true);
            try {
                await AuthApi.register(values);
                navigate('/confirm-email', {email: values.email});
                Helper.toastSuccess('Đăng ký thành công!');
            } catch (error) {
                Helper.parseError(error);
            } finally {
                setIsLoading(false);
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
                             className="img-fluid" alt="Sample image"/>
                    </div>
                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                        <div className="authincation-content">
                            <div>
                                <h3 className="text-center mb-4 mt-2">Đăng ký tài khoản</h3>
                                <FormSignUp formik={formik} isLoading={isLoading}/>
                                <div className="mt-2 text-center">
                                    <p>
                                        Đã có tài khoản ?{" "}
                                        <Link to="/login"
                                              className="text-primary"
                                              style={{cursor: 'pointer'}}
                                        >
                                            Đăng nhập
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Signup;
