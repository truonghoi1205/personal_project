import axiosInstance from "./axiosInstance";

class AuthApi {
    static login(data) {
        return axiosInstance.post('/api/v1/auth/login', data);
    }
    static register(data) {
        return axiosInstance.post('/api/v1/auth/register', data);
    }
    static forgotPassword(data) {
        return axiosInstance.post('/api/v1/auth/forgot-password', data, {
            headers: {
                "Content-Type": "application/json",
            }
        });
    }
    static confirmEmail(token) {
        return axiosInstance.get(`/api/v1/auth/confirm?token=${token}`)
    }
}

export default AuthApi;