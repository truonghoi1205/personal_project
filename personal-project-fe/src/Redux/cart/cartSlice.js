import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CartItemApi from "../../Apis/CartItemApi";
import CartApi from "../../Apis/CartApi";

const initialState = {
    cartId: null,
    cartItems: [],
    status: 'idle',
    error: null,
    total: 0,
};

export const fetchCartItemByCart = createAsyncThunk(
    'cart/fetchCartItems',
    async (cartId) => {
        const response = await CartItemApi.getAllCartItemsByCart(cartId);
        return { cartItems: response.data || [] };
    }
);

export const fetchCartId = createAsyncThunk(
    'cart/fetchCartId',
    async (customerId) => {
        const response = await CartApi.getCartByCustomerId(customerId);
        return response.data.id;
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartId(state, action) {
            state.cartId = action.payload;
        },
        resetCart(state) {
            state.cartId = null;
            state.cartItems = [];
            state.total = 0;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartId.fulfilled, (state, action) => {
                state.cartId = action.payload;
            })
            .addCase(fetchCartItemByCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCartItemByCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cartItems = action.payload.cartItems;
            })
            .addCase(fetchCartItemByCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setCartId, resetCart } = cartSlice.actions; // Export hành động resetCart
export default cartSlice.reducer;