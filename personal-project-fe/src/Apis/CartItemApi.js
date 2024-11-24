import axiosInstance from "./axiosInstance";

class CartItemApi {
    static getAllCartItemsByCart(cartId) {
        return axiosInstance.get(`/api/v1/cart-items/${cartId}`);
    }
    static addToCart(cartItem) {
        return axiosInstance.post(`/api/v1/cart-items`, cartItem);
    }
    static updateQuantity(cartItemId, quantity) {
        return axiosInstance.put(`/api/v1/cart-items/${cartItemId}`, {
            quantity: quantity,
        });
    }
    static deleteCartItem(cartItemId) {
        return axiosInstance.delete(`/api/v1/cart-items/${cartItemId}`);
    }
}

export default CartItemApi;