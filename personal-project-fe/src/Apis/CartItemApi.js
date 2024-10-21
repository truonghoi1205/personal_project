import axiosInstance from "./axiosInstance";

class CartItemApi {
    static getAllCartItemsByCart(cartId) {
        return axiosInstance.get(`/api/v1/cart-items/${cartId}`);
    }
    static createCartItem(cartItem) {
        return axiosInstance.post(`/api/v1/cart-items`, cartItem);
    }

}

export default CartItemApi;