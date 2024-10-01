import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import "../../style/FormLogin.css"

const PasswordInput = ({ formik, fieldName, value,label, onChange, placeholder }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const inputProps = formik
        ? {
            ...formik.getFieldProps(fieldName),
            isInvalid: formik.touched[fieldName] && formik.errors[fieldName],
            onBlur: formik.handleBlur
        }
        : {
            value,
            onChange,
        };

    return (
        <Form.Group controlId={fieldName} className={"form-outline"}>
                <Form.Label>{label}</Form.Label>
                <div className="position-relative">
                    <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        name={fieldName}
                        {...inputProps}
                        placeholder={placeholder}
                        className="ico-is-valid form-control"
                    />
                    <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className="position-absolute eye-icon"
                        style={{ right: '10px', cursor: 'pointer' }}
                        onClick={handleTogglePassword}
                    />
                </div>
                {formik && (
                    <Form.Control.Feedback type="invalid">
                        {formik.errors[fieldName]}
                    </Form.Control.Feedback>
                )}

        </Form.Group>
    );
};

export default PasswordInput;
