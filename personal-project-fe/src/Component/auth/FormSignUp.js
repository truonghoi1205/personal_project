import React from "react";
import PasswordInput from "./PasswordInput";

function SignUpForm({formik, isLoading}) {
    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <div className="mb-3">
                    <label>Tên người dùng</label>
                    <input
                        className="form-control"
                        id="name"
                        name="name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.name}
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
                    />
                </div>
                <div className="mb-3">
                    <PasswordInput
                        formik={formik}
                        fieldName="confirmPassword"
                        label="Nhập lại mật khẩu"
                    />
                </div>
            </div>

            <div className="text-center mt-4">
                <button
                    type="submit"
                    className="btn btn-primary btn-block w-100"
                    disabled={formik.isSubmitting}
                >
                    {isLoading ? (
                        <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        'Đăng Ký'
                    )}
                </button>
            </div>
        </form>
    );
}

export default SignUpForm;