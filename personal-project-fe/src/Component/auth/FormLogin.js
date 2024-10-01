import {Link} from "react-router-dom";
import PasswordInput from "./PasswordInput";
import 'bootstrap/dist/css/bootstrap.min.css';

function FormLogin({formik}) {
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="w-75 m-auto">
                <div className="form-outline">
                    <label>Email</label>
                    <input
                        className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        name="email"
                        type="text invalid"
                        placeholder="Email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="text-danger">{formik.errors.email}</div>
                    )}
                </div>
                <div className="form-outline my-3">
                    <PasswordInput
                        formik={formik}
                        fieldName="password"
                        placeholder="Mật khẩu"
                        label="Mật khẩu"
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div className="text-danger">{formik.errors.password}</div>
                    )}
                </div>
            </div>
            <div className="text-center my-4">
                <button type="submit"
                        className="btn btn-primary btn-block w-50" disabled={formik.isSubmitting}>Đăng nhập
                </button>
            </div>
            <div className="d-flex justify-content-around align-items-center ">
                <Link to="/forgot-password" className="forgot-password">Quên mật khẩu ?</Link>
            </div>
            <div className="divider d-flex align-items-center my-4"></div>
        </form>
    );
}

export default FormLogin;