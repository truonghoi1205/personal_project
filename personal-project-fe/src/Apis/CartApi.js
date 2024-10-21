import axiosInstance from "./axiosInstance";

class CartApi {
    static getCartByCustomerId(customerId) {
        return axiosInstance.get(`/api/v1/carts/customer/${customerId}`);
    }
}

export default CartApi;