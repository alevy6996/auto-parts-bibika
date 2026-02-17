import { OrderResponse } from '@store/query/orders/response/orders.response';

export type OrderData = OrderResponse & {
    positionId: string,
    statusColor: string
}