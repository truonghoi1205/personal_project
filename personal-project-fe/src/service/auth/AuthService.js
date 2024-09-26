import axios from "axios";

export const login = async (credentials) => {
    return await axios.post('http://localhost:8080/api/auth/login', credentials);
};