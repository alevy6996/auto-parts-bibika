import { CartState } from '@store/cart/cart-state.model';
import { PayloadAction } from '@reduxjs/toolkit';
import { CartContentMeta } from '@shared/types/cart-content-meta';

const setCheckedAll = (checked: boolean) => (state: CartState) => {
    state.cartItems = state.cartItems.map((item) => {
        return {
            ...item,
            checked
        }
    })
}

const cartActions = {
    setCartItems: (state: CartState, { payload }: PayloadAction<CartState['cartItems']>) => {
        return {
            ...state,
            cartItems: payload
        }
    },
    updateCurrentOrderIds: (state: CartState, { payload }: PayloadAction<{ oldId: number, newId: number }[]>) => {
        payload.forEach(({ oldId, newId }) => {
            const index = state.cartItems.findIndex(({ positionId }) => positionId === oldId);
            state.cartItems[index].positionId = newId;
        })
    },
    addItem: (state: CartState, { payload }: PayloadAction<CartContentMeta>) => {
        state.cartItems.push(payload);
    },
    addItems: (state: CartState, { payload }: PayloadAction<CartContentMeta[]>) => {
        state.cartItems.push(...payload);
    },
    deleteItem: (state: CartState, { payload }: PayloadAction<number>) => {
        const index = state.cartItems.findIndex(item => item.positionId === payload);
        if(index === -1) return state;
        state.cartItems.splice(index, 1);
    },
    deleteItems: (state: CartState, { payload }: PayloadAction<number[]>) => {
        state.cartItems = state.cartItems.filter(({ positionId }) => !payload.includes(positionId))
    },
    updateItem: (state: CartState, { payload }: PayloadAction<Partial<CartContentMeta> & { positionId: number }>) => {
        const itemIndex = state.cartItems.findIndex(item => item.positionId === payload.positionId);
        if(itemIndex === -1) return state;

        state.cartItems[itemIndex] = {
            ...state.cartItems[itemIndex],
            ...payload
        };
    },
    setUpdating: (state: CartState, { payload }: PayloadAction<boolean>) => {
        state.updating = payload;
    },
    checkAll: setCheckedAll(true),
    unCheckAll: setCheckedAll(false),
}

export default cartActions;