import authReducer from './auth/authSlice';
import productReducer from './product/productSlice';
import brandReducer from './brand/brandSlice';
import categoryReducer from './category/categorySlice';
import cartReducer from './cart/cartSlice';
import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        categories: categoryReducer,
        brands: brandReducer,
        cart: cartReducer,
    },
});

export default store;