import {OrderPositionResponse} from '@store/query/orders/response/order-position.response';

export type OrderResponse = {
    number: number;
    status: string;
    statusId: number;
    statusCode: string;
    positionsQuantity: number;
    sum: number;
    date: string;
    comment: string;
    wholeOrderOnly: 0 | 1;
    positions: OrderPositionResponse[];
}
