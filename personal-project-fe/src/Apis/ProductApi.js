import axiosInstance from "./axiosInstance";

class ProductApi {
    static getAllProducts(season = '') {
        const url = season ? `/api/v1/products?season=${season}` : `/api/v1/products`;
        return axiosInstance.get(url);
    }
    static createProduct(product) {
        return axiosInstance.post('/api/v1/products', product);
    }
    static updateProduct(id, data) {
        return axiosInstance.put(`/api/v1/products/${id}`, data);
    }
    static deleteProduct(id) {
        return axiosInstance.delete(`/api/v1/products/${id}`);
    }
    static getProductById(id) {
        return axiosInstance.get(`/api/v1/products/${id}`);
    }
    static getAllProductByBrand(brand) {
        return axiosInstance.get(`/api/v1/products/brand/${brand}`);
    }
    static getAllProductByCategory(category) {
        return axiosInstance.get(`/api/v1/products/category/${category}`);
    }
    static async getProductBySlug(slug) {
        return axiosInstance.get(`/api/v1/products/product/${slug}`);
    }
}

export default ProductApi;