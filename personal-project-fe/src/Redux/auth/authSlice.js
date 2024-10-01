import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import UserApi from "../../Apis/UserApi";

const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,
    status: 'idle',
    isAuthenticated: false,
    roles: [],
};

export const fetchUser = createAsyncThunk('auth/fetchUser', async (token) => {
    const res= await UserApi.getCurrentUser();
    return res.data;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.status = "idle";
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },
        logout: (state) => {
            localStorage.removeItem('token');
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.roles = [];
            state.status = 'idle';
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
                state.roles = action.payload.roles;
                state.isAuthenticated = true;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed';
                localStorage.removeItem('token');
            });
    }
});

export const {setToken, logout} = authSlice.actions;

export default authSlice.reducer;