import axiosInstance from "./axiosInstance";

class UserApi {
    static getCurrentUser() {
        return axiosInstance.get('/api/v1/auth/me');
    }
}

export default UserApi;