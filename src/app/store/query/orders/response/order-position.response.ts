import {CartContentResponse} from '@store/query/cart/responses/cart-content.response';
import {StatusResponse} from '@shared/responses/status.response';

export type OrderPositionResponse = Omit<CartContentResponse, keyof StatusResponse | 'packing' | 'priceRate' | 'priceInSiteCurrency'> & {
    status: string;
    statusId: number;
    statusCode: number;
    positionId: number;
}
