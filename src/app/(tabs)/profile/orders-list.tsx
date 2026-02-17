import React, { useMemo } from 'react';
import { useOrdersQuery } from '@store/query/orders/orders.api';
import { OrdersResponse } from '@store/query/orders/response/orders.response';
import { emptyOrdersProp } from '@store/query/orders/props/get-orders.prop';
import { FlashList } from '@shopify/flash-list';
import { OrderData } from '@shared/types/order-data';
import { OrderInfo } from '@components/orders/order-info';
import { HelperText } from 'react-native-paper';
import { Flex } from 'react-native-flex-layout';
import { APP_MARGIN } from '@shared/consts/app.const';

const defaultResponse: OrdersResponse = {
    items: {},
    count: 0
}

export default function OrdersList() {

    const { data = defaultResponse, isFetching, refetch } = useOrdersQuery(emptyOrdersProp);

    const parsedData: OrderData[] = useMemo(() => {
        if (data.count) {
            return Object.entries(data.items).map(([key, value]) => {
                return {
                    positionId: key,
                    ...value
                }
            }).reverse(); // Почему-то объект приходит перевёрнутый
        } else {
            return []
        }
    }, [data]);

    return (
        <FlashList
            ListEmptyComponent={
                <Flex fill center m={APP_MARGIN}>
                    <HelperText type='info'>Нет результатов</HelperText>
                </Flex>
            }
            estimatedItemSize={200}
            nestedScrollEnabled
            refreshing={isFetching}
            onRefresh={refetch}
            data={parsedData}
            renderItem={({ item }) => <OrderInfo item={item} />}
        />
    )
}