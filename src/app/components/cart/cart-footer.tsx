import React, { useCallback, useMemo } from 'react';
import { APP_MARGIN } from '@shared/consts/app.const';
import { Checkbox, CheckboxProps, Divider, Text, useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { getNoun } from '@shared/features/get-noun';
import { HStack, VStack } from 'react-native-flex-layout';
import { OrderCheckoutLink } from '@components/cart/order-checkout-link';
import { ShadowedView, shadowStyle } from 'react-native-fast-shadow';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import CartSelectors from '@store/cart/cart.selectors';
import { CartActions } from '@store/cart/cart.store';

export const CartFooter = () => {
    const { colors } = useTheme();

    const cartPositionsNumber = useAppSelector(CartSelectors.cartLength);
    const itemsNumber = useAppSelector(CartSelectors.currentOrderItemsNumber);
    const positionsNumber = useAppSelector(CartSelectors.currentOrderLength);
    const total = useAppSelector(CartSelectors.currentOrderTotal);

    const dispatch = useAppDispatch();

    const checkboxStatus: CheckboxProps['status'] = useMemo(() => {
        const diff = cartPositionsNumber - positionsNumber;

        if (diff === 0)
            return 'checked'

        if (diff < cartPositionsNumber)
            return 'indeterminate'

        return 'unchecked'
    }, [positionsNumber, cartPositionsNumber]);

    const positionsNoun = useMemo(() => {
        const left = getNoun('Выбрана', 'Выбраны', 'Выбрано', positionsNumber);
        const right = getNoun('позиция', 'позиции', 'позиций', positionsNumber);

        return `${left} ${positionsNumber} ${right}`;
    }
    , [positionsNumber]);
    const itemsNoun = useMemo(() => {
        const right = getNoun('товар', 'товара', 'товаров', itemsNumber);

        return `${itemsNumber} ${right}`;
    }
    , [itemsNumber]);

    const switchCheckbox = useCallback(() => {
        switch (checkboxStatus) {
            case 'checked':
                dispatch(CartActions.unCheckAll());
                break;
            default:
                dispatch(CartActions.checkAll());
        }
    }, [checkboxStatus]);

    return (

        <ShadowedView
            style={shadowStyle({
                opacity: 0.3,
                radius: 8,
                offset: [0, 0]
            })}
        >
            <VStack
                style={[
                    styles.surface,
                    {
                        backgroundColor: colors.elevation.level4
                    }
                ]}
            >

                <HStack>
                    <Checkbox.Item
                        labelVariant='labelLarge'
                        style={{
                            paddingHorizontal: 0,
                            paddingVertical: 0,
                            marginLeft: -APP_MARGIN
                        }}
                        position={'leading'}
                        label={positionsNoun}
                        status={checkboxStatus}
                        onPress={switchCheckbox}
                    />
                </HStack>

                <Divider/>

                <HStack pt={APP_MARGIN / 2} w={'100%'} justify='between' items='center'>
                    <VStack>
                        <Text variant='labelMedium'>{itemsNoun}</Text>
                        <Text variant='titleMedium'>{total} ₽</Text>
                    </VStack>

                    <OrderCheckoutLink/>
                </HStack>
            </VStack>
        </ShadowedView>
    )
}

const styles = StyleSheet.create({
    surface: {
        paddingBottom: APP_MARGIN,
        paddingHorizontal: APP_MARGIN * 2,
        width: '100%',
    }
})