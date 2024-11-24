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

export const deleteCartItem = createAsyncThunk(
    'cart/deleteCartItem',
    async (cartItemId) => {
        await CartItemApi.deleteCartItem(cartItemId);
        return cartItemId;
    }
);

export const updateQuantity = createAsyncThunk(
    'cart/updateQuantity',
    async ({ cartItemId, quantity }) => {
        await CartItemApi.updateQuantity(cartItemId, quantity);
        return { cartItemId, quantity };
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
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                const cartItemId = action.payload;
                state.cartItems = state.cartItems.filter(item => item.id !== cartItemId);
            })
            .addCase(updateQuantity.fulfilled, (state, action) => {
            const { cartItemId, quantity } = action.payload;
            const item = state.cartItems.find(item => item.id === cartItemId);
            if (item) {
                const priceDifference = (quantity - item.quantity) * item.productDetail.price;
                item.quantity = quantity;
                state.total += priceDifference;
            }
        });
    },
});

export const { setCartId, resetCart } = cartSlice.actions;
export default cartSlice.reducer;