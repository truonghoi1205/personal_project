import axiosInstance from "./axiosInstance";

class AuthApi {
    static login(data) {
        return axiosInstance.post('/api/v1/auth/login', data);
    }
    static register(data) {
        return axiosInstance.post('/api/v1/auth/register', data);
    }
}

export default AuthApi;