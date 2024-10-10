import authReducer from './auth/authSlice';
import productReducer from './product/productSlice';
import brandReducer from './brand/brandSlice';
import categoryReducer from './category/categorySlice';
import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        categories: categoryReducer,
        brands: brandReducer
    },
});

export default store;