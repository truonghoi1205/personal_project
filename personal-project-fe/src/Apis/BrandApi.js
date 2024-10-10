import axiosInstance from "./axiosInstance";

class BrandApi {
    static getAllBrands() {
        return axiosInstance.get('/api/v1/brands');
    }
    static createBrand(brand) {
        return axiosInstance.post('/api/v1/brands', brand);
    }
    static updateBrand(brand, data) {
        return axiosInstance.put(`/api/v1/brands/${brand}`, data);
    }
    static deleteBrand(brand) {
        return axiosInstance.delete(`/api/v1/brands/${brand}`);
    }
}

export default BrandApi;