import { createSlice } from '@reduxjs/toolkit';
import { initialCartState } from '@store/cart/cart.const';
import cartActions from '@store/cart/cart.actions';

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: cartActions
})

export const CartActions = cartSlice.actions;
export default cartSlice.reducer;