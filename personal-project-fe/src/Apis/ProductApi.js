import axiosInstance from "./axiosInstance";

class ProductApi {
    static getAllProducts() {
        return axiosInstance.get('/api/v1/product');
    }
    static createProduct(product) {
        return axiosInstance.post('/api/v1/product', product);
    }
    static updateProduct(product, data) {
        return axiosInstance.put(`/api/v1/product/${product}`, data);
    }
    static deleteProduct(product) {
        return axiosInstance.delete(`/api/v1/product/${product}`);
    }
}

export default ProductApi;