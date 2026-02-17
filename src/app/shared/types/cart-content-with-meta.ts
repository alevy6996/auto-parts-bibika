import { CartContentResponse } from '@store/query/cart/responses/cart-content.response';
import { CartContentMeta } from '@shared/types/cart-content-meta';

export type CartContentWithMeta = CartContentResponse & CartContentMeta;