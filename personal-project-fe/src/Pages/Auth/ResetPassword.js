import {useFormik} from "formik";
import AuthApi from "../../Apis/AuthApi";
import Helper from "../../utils/Helper";
import {useLocation, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import * as Yup from "yup";
import PasswordInput from "../../Component/Auth/PasswordInput";

// Sửa lại để đồng nhất tên của các trường
const validationSchema = Yup.object({
    newPassword: Yup.string().required("Vui lòng nhập mật khẩu!"),
    reEnterPassword: Yup.string()
        .required("Xác nhận mật khẩu phải nhập!")
        .oneOf([Yup.ref('newPassword'), null], "Mật khẩu xác nhận không trùng với mật khẩu mới")
});

function ResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const token = new URLSearchParams(location.search).get('token');
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: { newPassword: '', reEnterPassword: ''}, 
        validationSchema,
        onSubmit: async (values, {setSubmitting}) => {
            setIsLoading(true);
            try {
                await AuthApi.updateNewPassword(token, values);
                navigate('/login');
                Helper.toastSuccess('Đặt lại mật khẩu thành công!');
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
        <form onSubmit={formik.handleSubmit} className="container mt-5" style={{width: "500px"}}>
            <div className="shadow-sm p-4 ">
                <h3 className="text-center mb-3">Đặt lại mật khẩu</h3>
                <div className="mb-3">
                    <PasswordInput
                        formik={formik}
                        fieldName="newPassword"
                        label="Mật khẩu mới"
                        placeholder="Mật khẩu mới"
                    />
                    {formik.touched.newPassword && formik.errors.newPassword && (
                        <div className="text-danger">{formik.errors.newPassword}</div>
                    )}
                </div>
                <div className="mb-4">
                    <PasswordInput
                        formik={formik}
                        fieldName="reEnterPassword"
                        label="Nhập lại mật khẩu"
                        placeholder="Nhập lại mật khẩu"
                    />
                    {formik.touched.reEnterPassword && formik.errors.reEnterPassword && (
                        <div className="text-danger">{formik.errors.reEnterPassword}</div>
                    )}
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-block w-25" disabled={isLoading}>
                        {isLoading ? (
                            <div className="spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        ) : (
                            'Xác nhận'
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
}

export default ResetPassword;
