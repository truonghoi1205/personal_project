import axiosInstance from "./axiosInstance";

class ProductApi {
    static getAllProducts() {
        return axiosInstance.get('/api/v1/products');
    }
    static createProduct(product) {
        return axiosInstance.post('/api/v1/products', product);
    }
    static updateProduct(product, data) {
        return axiosInstance.put(`/api/v1/products/${product}`, data);
    }
    static deleteProduct(product) {
        return axiosInstance.delete(`/api/v1/products/${product}`);
    }
    static getAllProductByBrand(brand) {
        return axiosInstance.get(`/api/v1/products/thuong-hieu/${brand}`);
    }
    static getAllProductByCategory(category) {
        return axiosInstance.get(`/api/v1/products/phan-loai/${category}`);
    }
}

export default ProductApi;