import appStore from '@store/app.store';
import { AsyncStorageService } from '@services/async-storage.service';

export async function PersistCart() {
    const { cartItems } = appStore.getState().cart;
    await AsyncStorageService.setObject('cart', cartItems);
    console.log('[PersistCart] cart saved')
}

export async function PersistOrders() {
    const orders = appStore.getState().orders.orderItems;
    await AsyncStorageService.setObject('orders', orders);
    console.log('[PersistOrders] orders saved')
}

export async function PersistData() {
    await Promise.all([
        PersistCart(), PersistOrders()
    ]);
    console.log('[PersistAll] all data persisted');
}