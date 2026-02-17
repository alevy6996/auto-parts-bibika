import { OrdersConstants } from '@shared/consts';

export interface GetOrdersProp {
    format: string,
    skip: number,
    limit: number
}
export const emptyOrdersProp = {
    format: OrdersConstants.detailedFormat,
    skip: OrdersConstants.ordersSkipNumber,
    limit: OrdersConstants.ordersShownLimit
} as GetOrdersProp;