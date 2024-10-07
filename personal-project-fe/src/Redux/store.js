import authReducer from './auth/authSlice';
import productReducer from './product/productSlice';
import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
    },
});

export default store;