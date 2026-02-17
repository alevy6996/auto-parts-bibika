import React from 'react';
import { APP_MARGIN } from '@shared/consts/app.const';
import { HStack, VStack } from 'react-native-flex-layout';
import { Text } from 'react-native-paper';
import { CartContentMeta } from '@shared/types/cart-content-meta';

interface CartCheckoutItemPriceProps {
    item: CartContentMeta;
    outlineColor: string
}

export const CartCheckoutItemPrice = ({ item, outlineColor }: CartCheckoutItemPriceProps) => {
    return (<HStack mt={APP_MARGIN} justify='between' items='center'>
        <VStack>
            <Text variant={'labelLarge'}>{item.brand}</Text>
            <Text variant={'labelLarge'}>{item.number}</Text>
        </VStack>
        <HStack spacing={APP_MARGIN} items='end'>
            <Text
                style={{ color: outlineColor }}
                variant={'labelMedium'}
            >{item.quantity} x {(+item.price).toLocaleString('ru')} ₽</Text>
            <Text
                variant={'titleMedium'}
            >{(item.price * item.quantity).toLocaleString('ru')} ₽</Text>
        </HStack>
    </HStack>)
}