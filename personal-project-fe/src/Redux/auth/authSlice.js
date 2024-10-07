import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserApi from '../../Apis/UserApi';

// Khởi tạo trạng thái ban đầu
const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    status: 'idle'
};

// Thunk để lấy thông tin người dùng từ API
export const fetchUser = createAsyncThunk('auth/fetchUser', async (token, { rejectWithValue }) => {
    try {
        const res = await UserApi.getCurrentUser();// Gọi API để lấy thông tin người dùng
        return res.data; // Trả về dữ liệu người dùng
    } catch (err) {
        return rejectWithValue(err.response.data); // Trả về lỗi nếu API thất bại
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.status = 'idle';
            state.token = action.payload;
            state.isAuthenticated = true; // Đặt trạng thái xác thực
            localStorage.setItem('token', action.payload); // Lưu token vào localStorage
        },
        logout: (state) => {
            localStorage.removeItem('token'); // Xóa token khỏi localStorage
            state.token = null;
            state.user = null;
            state.isAuthenticated = false; // Đặt lại trạng thái xác thực
            state.status = 'idle'; // Đặt lại trạng thái về idle
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading'; // Đang tải dữ liệu
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Lấy dữ liệu thành công
                state.isAuthenticated = true; // Xác thực thành công
                state.user = action.payload; // Lưu thông tin người dùng
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed'; // Lấy dữ liệu thất bại
                state.isAuthenticated = false; // Không xác thực
                state.user = null;
                localStorage.removeItem('token'); // Xóa token khỏi localStorage nếu thất bại
            });
    }
});

// Xuất ra các actions để dùng trong component
export const { setToken, logout } = authSlice.actions;

export default authSlice.reducer;
