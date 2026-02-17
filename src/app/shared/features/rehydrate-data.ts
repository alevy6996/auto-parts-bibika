import appStore from '@store/app.store'
import { AsyncStorageService } from '@services/async-storage.service';
import { CartContentMeta } from '@shared/types/cart-content-meta';
import { CartActions } from '@store/cart/cart.store';
import { OrdersActions } from '@store/orders/orders.store';

export async function RehydrateCart() {
    const cartItems = await AsyncStorageService.getObject<CartContentMeta[]>('cart') ?? [];
    appStore.dispatch(CartActions.setCartItems(cartItems));
    console.log('[RehydrateCart] cart rehydrated', cartItems);
}
export async function RehydrateOrders() {
    const ordersItems = await AsyncStorageService.getObject<CartContentMeta[]>('orders') ?? [];
    appStore.dispatch(OrdersActions.setOrders(ordersItems));
    console.log('[RehydrateOrders] orders rehydrated')
}

export async function RehydrateData() {
    return Promise.all([
        RehydrateCart(),
        RehydrateOrders()
    ])
}