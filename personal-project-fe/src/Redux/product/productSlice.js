import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductApi from "../../Apis/ProductApi";

const initialState = {
    products: [],
    status: 'idle',
    error: null,
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await ProductApi.getAllProducts();
    return response.data || [];
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
    await ProductApi.deleteProduct(id);
    return id;
});

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id) => {
    const response = await ProductApi.getProductById(id);
    return response.data;
});

export const fetchProductsByBrands = createAsyncThunk('products/fetchProductsByBrands', async (brandName) => {
    const response = await ProductApi.getAllProductByBrand(brandName);
    return response.data || [];
});

export const fetchProductsByCategories = createAsyncThunk('products/fetchProductsByCategories', async (categoryName) => {
    const response = await ProductApi.getAllProductByCategory(categoryName);
    return response.data || [];
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
            .addCase(deleteProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                const id = action.payload;
                state.products = state.products.filter(product => product.id !== id);
                state.status = 'succeeded';
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchProductById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.productDetail = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchProductsByBrands.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductsByBrands.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
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
                state.products = action.payload;
            })
            .addCase(fetchProductsByCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { resetProducts } = productSlice.actions;

export default productSlice.reducer;
