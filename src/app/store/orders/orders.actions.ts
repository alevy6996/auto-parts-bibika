import { OrderState } from '@store/orders/orders-state.model';
import { PayloadAction } from '@reduxjs/toolkit';
import { CartContentMeta } from '@shared/types/cart-content-meta';

const ordersActions = {
    setOrders: ({ orderItems }: OrderState, { payload }: PayloadAction<CartContentMeta[]>) => {
        orderItems = payload;
    },
    addItem: ({ orderItems }: OrderState, { payload }: PayloadAction<CartContentMeta>) => {
        orderItems.push(payload);
    },
    addItems: ({ orderItems }: OrderState, { payload }: PayloadAction<CartContentMeta[]>) => {
        orderItems.push(...payload);
    },
    deleteItem: (state: OrderState, { payload }: PayloadAction<number>) => {
        const index = state.orderItems.findIndex(item => item.positionId === payload);
        if (index === -1) return state;
        state.orderItems.splice(index, 1);
    },
    deleteItems: ({ orderItems }: OrderState, { payload }: PayloadAction<number[]>) => {
        orderItems = orderItems.filter(({ positionId }) => !payload.includes(positionId));
    }
}

export default ordersActions;