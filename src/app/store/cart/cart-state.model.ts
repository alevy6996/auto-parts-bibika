import { CartContentMeta } from '@shared/types/cart-content-meta';

export interface CartState {
    cartItems: CartContentMeta[];
    updating: boolean;
}