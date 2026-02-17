export type OrderStatusesResponse = OrderStatus[];

export type OrderStatus = {
    id: number;
    name: string;
    color: string;
    isFinalStatus: boolean;
}
