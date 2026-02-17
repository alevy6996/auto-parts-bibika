import { OrdersPosition } from '@store/query/orders/response/orders.response';
import Animated from 'react-native-reanimated';
import { Flex } from 'react-native-flex-layout';
import { FlashList } from '@shopify/flash-list';
import { OrderPositionInfo } from '@components/orders/order-position-info';
import React from 'react';
import { Divider } from 'react-native-paper';

interface OrderPositionsListProps {
    style:  {
        height: number
    },
    positions: OrdersPosition[],
    minimize?: boolean;
    imageSize: number
}
export const OrderPositionsList = ({ style, minimize = false, positions, imageSize }: OrderPositionsListProps) => {
    return (
        <Animated.View
            style={[
                style,
                {
                    overflow: 'hidden',
                }
            ]}
        >
            <Flex fill minH={90}>
                <FlashList
                    fadingEdgeLength={120}
                    ItemSeparatorComponent={minimize ? null : () => <Divider />}
                    estimatedItemSize={minimize ? 90 : 120}
                    numColumns={minimize ? 4 : 1}
                    nestedScrollEnabled
                    data={positions}
                    renderItem={({ item: position }) => <OrderPositionInfo imageSize={imageSize} minimize={minimize} position={position}/>}
                />
            </Flex>
        </Animated.View>
    )
}