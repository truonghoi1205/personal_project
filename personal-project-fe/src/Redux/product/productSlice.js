import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductApi from "../../Apis/ProductApi";

const initialState = {
    products: [],
    status: 'idle',
    error: null,
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await ProductApi.getAllProducts();
    return response.data;
});

export const fetchProductsByBrands = createAsyncThunk('products/fetchProductsByBrands', async (brandName) => {
    const response = await ProductApi.getAllProductByBrand(brandName);
    return response.data;
});

export const fetchProductsByCategories = createAsyncThunk('products/fetchProductsByCategories', async (categoryName) => {
    const response = await ProductApi.getAllProductByCategory(categoryName);
    return response.data;
});

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        resetProducts: (state) => {
            state.products = [];
            state.status = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchProductsByBrands.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductsByBrands.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload; // Lưu sản phẩm đã lọc
            })
            .addCase(fetchProductsByBrands.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(fetchProductsByCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductsByCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload; // Lưu sản phẩm đã lọc
            })
            .addCase(fetchProductsByCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { resetProducts } = productSlice.actions;

export default productSlice.reducer;
