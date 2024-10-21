import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserApi from '../../Apis/UserApi';
import { resetCart } from '../cart/cartSlice';

const initialState = {
    customerId: null,
    user: null,
    token: localStorage.getItem('token') || null,
    roles: [],
    isAuthenticated: !!localStorage.getItem('token'),
    status: 'idle',
};

export const fetchUser = createAsyncThunk('Auth/fetchUser', async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
        const res = await UserApi.getCurrentUser(token);
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
            state.roles = [];
            state.isAuthenticated = false;
            state.status = 'idle';
            resetCart();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuthenticated = true;
                state.roles = action.payload.roles || [];
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state) => {
                state.status = 'failed';
                state.isAuthenticated = false;
                state.user = null;
                localStorage.removeItem('token');
            });
    },
});

export const { setToken, logout } = authSlice.actions;

export default authSlice.reducer;
