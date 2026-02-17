import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '@store/query/axios.query';
import { OrderCartResponse } from '@store/query/orders/response/order-cart.response';
import { OrderInstantProp } from '@store/query/orders/props/order-instant.prop';
import { OrderStatusesResponse } from '@store/query/orders/response/order-statuses.response';
import { OrderListResponse } from '@store/query/orders/response/order-list.response';
import { OrdersResponse } from '@store/query/orders/response/orders.response';
import { OrdersConstants } from '../../../shared/consts';
import { GetOrdersProp } from '@store/query/orders/props/get-orders.prop';

export const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: axiosBaseQuery({ baseUrl: 'orders/' }),

    endpoints(build) {
        return {
            orderInstant: build.mutation<OrderCartResponse, OrderInstantProp>({
                query: (order) => ({
                    url: 'instant',
                    method: 'post',
                    params: {
                        ...order
                    }
                })
            }),
            orderStatuses: build.query<OrderStatusesResponse, void>({
                query: () => ({
                    url: 'statuses',
                })
            }),
            orderList: build.query<OrderListResponse, number[]>({
                query: (orderNumbers) => ({
                    url: 'list',
                    params: {
                        orderNumbers
                    }
                })
            }),
            /**
             * @param format - формат вывода результата.
             * По умолчанию отображается информация только по заказам.
             * При значении **'p'** - к заказам добавляется информация по всем позициям.
             * @param skip - кол-во заказов, которые нужно пропустить. По умолчанию - **0**.
             * @param limit - кол-во заказов, которые нужно отобразить за один раз.
             * Допускается любое значение от **1** до **1000**.
             * *По умолчанию - **100**.*
             */
            orders: build.query<OrdersResponse, GetOrdersProp>({
                query: ({
                    format = OrdersConstants.detailedFormat,
                    skip = OrdersConstants.ordersSkipNumber,
                    limit = OrdersConstants.ordersShownLimit
                }) => ({
                    url: '',
                    params: {
                        format,
                        skip,
                        limit
                    }
                })
            }),
            orderCancelPosition: build.mutation<{ message: string }, number>({
                query: (positionId) => ({
                    url: 'cancelPosition',
                    method: 'post',
                    params: {
                        positionId
                    }
                })
            }),
            orderSystemVersion: build.query<1 | 2, void>({
                query: () => ({
                    url: 'version',
                })
            }),
        };
    }
});

export const {
    useOrderInstantMutation,
    useOrderStatusesQuery,
    useOrderListQuery,
    useOrdersQuery,
    useOrderCancelPositionMutation,
    useOrderSystemVersionQuery
} = ordersApi;
