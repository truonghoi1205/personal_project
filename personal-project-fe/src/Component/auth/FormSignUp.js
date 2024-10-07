import React from "react";
import PasswordInput from "./PasswordInput";

function FormSignUp({formik, isLoading}) {
    return (
        <form onSubmit={formik.handleSubmit}>
            <div  className="w-75 m-auto">
                <div className="mb-3">
                    <label>Tên</label>
                    <input
                        className="form-control"
                        id="name"
                        name="name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        placeholder="Tên người dùng"
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className="text-danger">{formik.errors.name}</div>
                    ) : null}
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input
                        className="form-control"
                        id="email"
                        name="email"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        placeholder="Email"
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-danger">{formik.errors.email}</div>
                    ) : null}
                </div>
                <div className="mb-3">
                    <PasswordInput
                        formik={formik}
                        fieldName="password"
                        label="Mật khẩu"
                        placeholder="Mật khẩu"
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div className="text-danger">{formik.errors.password}</div>
                    )}
                </div>
                <div className="mb-3">
                    <PasswordInput
                        formik={formik}
                        fieldName="confirmPassword"
                        label="Nhập lại mật khẩu"
                        placeholder="Nhập lại mật khẩu"
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                        <div className="text-danger">{formik.errors.confirmPassword}</div>
                    )}
                </div>
            </div>

            <div className="text-center mt-4">
                <button
                    type="submit"
                    className="btn btn-primary btn-block w-50"
                    disabled={formik.isSubmitting}
                >
                    {isLoading ? (
                        <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        'Đăng ký'
                    )}
                </button>
            </div>
            <div className="divider d-flex align-items-center my-4"></div>
        </form>
    );
}

export default FormSignUp;