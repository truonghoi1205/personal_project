import axiosInstance from "./axiosInstance";

class CategoryApi {
    static getAllCategory() {
        return axiosInstance.get('/api/v1/categories');
    }
    static createCategory(category) {
        return axiosInstance.post('/api/v1/categories', category);
    }
    static updateCategory(category, data) {
        return axiosInstance.put(`/api/v1/categories/${category}`, data);
    }
    static deleteCategory(category) {
        return axiosInstance.delete(`/api/v1/categories/${category}`);
    }
}

export default CategoryApi;