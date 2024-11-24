import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CategoryApi from "../../Apis/CategoryApi";

const initialState = {
    categories: [],  // Sử dụng state "brands" để lưu trữ danh sách thương hiệu
    status: 'idle',
    error: null,
};

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const response = await CategoryApi.getAllCategory();
    return response.data;
});

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default categorySlice.reducer;
