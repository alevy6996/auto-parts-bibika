import React, { useMemo, useState } from 'react';
import { APP_MARGIN } from '@shared/consts/app.const';
import { Card, Divider, Text, useTheme } from 'react-native-paper';
import {
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';
import { OrderData } from '@shared/types/order-data'
import { OrderExpandButton } from '@components/orders/order-expand-button';
import { OrderPositionsList } from '@components/orders/order-positions-list';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { Flex, HStack, VStack } from 'react-native-flex-layout';
import { format } from 'date-fns';

interface OrderInfoProps {
    item: OrderData,
}

const maxHeight = 400;

const imageSize = (SCREEN_WIDTH - APP_MARGIN * 12) / 4

export const OrderInfo = ({ item }: OrderInfoProps) => {
    const { colors } = useTheme();
    const length = item.positions.length;

    const minimizedListHeight = useMemo(() =>
        Math.min(maxHeight,
            (imageSize + APP_MARGIN * 2) * Math.ceil(length / 5)
        ),
    [length]);
    const detailedListHeight = useMemo(() => 
        Math.min(maxHeight,
            (100 + APP_MARGIN) * length
        ),
    [length]);

    const height = useSharedValue(0);
    const [minimize, setMinimize] = useState(false);

    const detailedListStyle = useAnimatedStyle(() => ({
        height: withTiming(detailedListHeight * height.value, { duration: 300 })
    }))
    const minimizedListStyle = useAnimatedStyle(() => ({
        height: withTiming(minimizedListHeight - minimizedListHeight * height.value, { duration: 300 })
    }))

    const show = () => {
        height.value = 1;
        setMinimize(true)
    }
    const hide = () => {
        height.value = 0;
        setMinimize(false)
    }

    return (
        <Card style={{ margin: APP_MARGIN }}>
            <HStack m={APP_MARGIN * 2} justify='between'>
                <HStack spacing={APP_MARGIN * 2} >
                    <Flex
                        h={APP_MARGIN * 3}
                        w={APP_MARGIN * 3}
                        self='center'
                        style={{
                            backgroundColor: `#${item.statusColor}`,
                            borderWidth: 1,
                            borderColor: colors.outline,
                            borderRadius: 100
                        }}
                    />
                    <VStack spacing={APP_MARGIN}>
                        <Text variant='titleMedium'>{item.status}</Text>
                        <Text variant='titleSmall'>{item.number}</Text>
                    </VStack>
                </HStack>

                <VStack justify='end' items='end' spacing={APP_MARGIN}>
                    <Text>от {format(new Date(item.date), 'dd.MM.yyyy')} г.</Text>
                    <Text>Сумма: {item.sum} ₽</Text>
                </VStack>
            </HStack>

            <Card.Content>
                <OrderPositionsList imageSize={imageSize} positions={item.positions} style={minimizedListStyle} minimize={true}/>
                <OrderPositionsList imageSize={imageSize} positions={item.positions} style={detailedListStyle}/>
            </Card.Content>

            <Divider />

            <OrderExpandButton visible={minimize} hide={hide} show={show}/>
        </Card>
    )
}