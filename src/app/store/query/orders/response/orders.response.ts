import { OrderListItem } from '@store/query/orders/response/order-list.response';
import { OrderPositionResponse } from '@store/query/orders/response/order-position.response';

export interface OrdersResponse {
    count: number;
    items: Record<string, OrderResponse>;
}

export type OrderResponse = Omit<OrderListItem, 'statusId' | 'positions'> & {
    // Долг по оплате заказа
    debt: number;
    positions: OrdersPosition[];
    statusColor: string;
}
export type OrdersPosition = Omit<OrderPositionResponse, 'statusId' > & {
    // Заказываемое количество
    quantityOrdered: number;
    statusColor: string;
}
