import { createSlice } from '@reduxjs/toolkit';
import { initialOrderState } from '@store/orders/orders.const';
import ordersActions from '@store/orders/orders.actions';

const ordersSlice = createSlice({
    name: 'orders',
    initialState: initialOrderState,
    reducers: ordersActions
});

export const OrdersActions = ordersSlice.actions;
export default ordersSlice.reducer;