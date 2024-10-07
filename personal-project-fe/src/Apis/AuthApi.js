import axiosInstance from "./axiosInstance";

class AuthApi {
    static login(data) {
        return axiosInstance.post('/api/v1/auth/login', data);
    }
    static register(data) {
        return axiosInstance.post('/api/v1/auth/register', data);
    }
    static confirmAccount(token) {
        return axiosInstance.get(`/api/v1/auth/confirm-account?token=${token}`)
    }
    static forgotPassword(email) {
        return axiosInstance.post(`/api/v1/auth/forgot-password/${email}`);
    }
    static updateNewPassword(token, data) {
        return axiosInstance.put(`/api/v1/auth/reset-password?token=${token}`, {
            newPassword: data.newPassword,
            reEnterPassword: data.reEnterPassword
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        });
    }
}

export default AuthApi;