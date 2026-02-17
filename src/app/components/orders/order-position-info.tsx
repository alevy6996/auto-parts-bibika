import React, { useMemo } from 'react';
import { Text, useTheme } from 'react-native-paper';
import { CartContentMeta } from '@shared/types/cart-content-meta';
import { OrdersPosition } from '@store/query/orders/response/orders.response';
import { ArticleCardCover } from '@components/article/article-card-cover';
import { HStack, VStack } from 'react-native-flex-layout';
import { APP_MARGIN } from '@shared/consts/app.const';
import { MinimizedOrderPosition } from '@components/orders/minimized-order-position';
import { useAppSelector } from '@shared/hooks';
import CartSelectors from '@store/cart/cart.selectors';
import OrdersSelectors from '@store/orders/orders.selectors';


interface OrderInfoProp {
    position: OrdersPosition,
    minimize?: boolean,
    imageSize: number
}

export const OrderPositionInfo = ({ position, minimize = false, imageSize }: OrderInfoProp) => {

    const { colors } = useTheme();

    const defaultData: CartContentMeta = useMemo(() => {
        return {
            availability: 0,
            checked: true,
            images: [],
            packing: 0,
            ...position
        }
    }, [position.positionId]);

    const item = useAppSelector(OrdersSelectors.getItemById(position.positionId)) ?? defaultData;

    const priceString = `${(+position.price).toLocaleString('ru')} ₽`;
    const totalString = `${(position.price * position.quantityOrdered).toLocaleString('ru')} ₽`;

    if (minimize) return <MinimizedOrderPosition imageSize={imageSize} position={position} images={item.images}/>

    return (
        <VStack
            p={APP_MARGIN}
        >
            <HStack
                fill
                items='center'
            >
                <ArticleCardCover
                    images={item.images}
                    width={imageSize}
                    height={imageSize}
                    imageWrapperStyle={{
                        borderWidth: 1,
                        borderColor: `#${position.statusColor}`
                    }}
                />
                <VStack fill ml={APP_MARGIN} spacing={APP_MARGIN}>
                    <HStack
                        justify='between'
                    >
                        <VStack>
                            <Text>{item.brand}</Text>
                            <Text>{item.number}</Text>
                        </VStack>
                        <VStack
                            items='end'
                        >
                            <Text>{position.status}</Text>
                            <HStack spacing={APP_MARGIN} items='end'>
                                <Text
                                    style={{ color: colors.outline }}
                                    variant={'labelSmall'}
                                >
                                    {position.quantityOrdered} x {priceString}
                                </Text>
                                <Text>{totalString}</Text>
                            </HStack>
                        </VStack>
                        {position.comment && <Text>{position.comment}</Text>}
                    </HStack>
                    <Text>{position.description}</Text>
                </VStack>
            </HStack>
        </VStack>
    )
}