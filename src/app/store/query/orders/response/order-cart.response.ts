import {StatusResponse} from '@shared/responses/status.response';
import {OrderResponse} from '@store/query/orders/response/order.response';

export type OrderCartResponse = StatusResponse & {
    clientOrderNumber: number;
    orders: Record<string, OrderResponse>;
};
