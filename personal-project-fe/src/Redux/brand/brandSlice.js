import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BrandApi from "../../Apis/BrandApi";

const initialState = {
    brands: [],  // Sử dụng state "brands" để lưu trữ danh sách thương hiệu
    status: 'idle',
    error: null,
};

// Thunk để fetch toàn bộ brands
export const fetchBrands = createAsyncThunk('brands/fetchBrands', async () => {
    const response = await BrandApi.getAllBrands();
    return response.data;
});

const brandSlice = createSlice({
    name: 'brands',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBrands.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBrands.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.brands = action.payload;  // Gán kết quả vào "state.brands"
            })
            .addCase(fetchBrands.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default brandSlice.reducer;
