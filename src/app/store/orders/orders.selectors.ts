import { RootState } from '@store/store.type';
import { createSelector } from '@reduxjs/toolkit';

const getItems = ({ orders }: RootState) => orders.orderItems;

const OrdersSelectors = {
    getItemById: (id: number) => createSelector([getItems], items => items.find(item => item.positionId == id)),
    getItems
}

export default OrdersSelectors;