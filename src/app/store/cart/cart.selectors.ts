import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store/store.type';

const getCartItemsSelector = ({ cart }: RootState) => {
    return cart.cartItems
};
const getCurrentOrder = createSelector(getCartItemsSelector, result => result.filter(item => item.checked));

const CartSelectors = {
    getCart: getCartItemsSelector,
    cartLength: createSelector(getCartItemsSelector, result => result.length),
    getCurrentOrder,
    getItem: (id: number) => ({ cart }: RootState) => {
        return cart.cartItems.find(item => item.positionId === id);
    },
    isUpdating: ({ cart }: RootState) => {
        return cart.updating;
    },
    currentOrderLength: createSelector(getCurrentOrder, result => result.length),
    currentOrderItemsNumber: createSelector(getCurrentOrder, result => result.reduce((acc, curr) => acc + +curr.quantity, 0)),
    currentOrderTotal: createSelector(getCurrentOrder, result => result.reduce((prev, curr) => prev + curr.quantity * curr.price, 0)),
    currentOrderIds: createSelector(getCurrentOrder, result => result.map(item => item.positionId)),
}

export default CartSelectors;