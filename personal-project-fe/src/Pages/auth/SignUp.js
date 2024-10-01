import {useEffect, useState} from "react"; // Chỉnh sửa để sử dụng useEffect
import { useNavigate} from "react-router-dom";
import * as Yup from "yup";
import { useSelector} from "react-redux";
import {useFormik} from "formik";
import Helper from "../../utils/Helper";
import SignUpForm from "../../Component/auth/SignUpForm";
import AuthApi from "../../Apis/AuthApi";

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
        <div id="main-wrapper">
            <div className="container h-100 py-3">
                <div className="row justify-content-center h-100 align-items-center">
                    <div>
                        <SignUpForm formik={formik} isLoading={isLoading}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;
