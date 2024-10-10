import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserApi from '../../Apis/UserApi';

// Khởi tạo trạng thái ban đầu
const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,
    roles: [],
    isAuthenticated: !!localStorage.getItem('token'),
    status: 'idle',
};

// Thunk để lấy thông tin người dùng từ API
export const fetchUser = createAsyncThunk('auth/fetchUser', async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token; // Lấy token từ trạng thái hiện tại
    try {
        const res = await UserApi.getCurrentUser(token); // Đảm bảo token được truyền
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem('token', action.payload);
        },
        logout: (state) => {
            localStorage.removeItem('token');
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.status = 'idle'; // Đặt về 'idle' hoặc 'succeeded' khi người dùng đăng xuất
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading'; // Đang tải dữ liệu
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Thành công
                state.isAuthenticated = true;
                state.roles = action.payload.roles || [];
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state) => {
                state.status = 'failed'; // Thất bại
                state.isAuthenticated = false;
                state.user = null;
                localStorage.removeItem('token'); // Xóa token nếu thất bại
            });
    },
});

export const { setToken, logout } = authSlice.actions;

export default authSlice.reducer;
