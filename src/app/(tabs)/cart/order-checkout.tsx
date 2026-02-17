import React, { useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { TabBarActions } from '@store/tab-bar/tab-bar.store';
import { OrderCheckoutItem } from '@components/cart/order-checkout-item';
import { FlashList } from '@shopify/flash-list';
import { router, useFocusEffect } from 'expo-router';
import { Surface, Text, useTheme } from 'react-native-paper';
import { APP_MARGIN } from '@shared/consts/app.const';
import { useOrderCartMutation } from '@store/query/cart/cart.api';
import { StyleSheet } from 'react-native';
import { OrderCartButton } from '@components/cart/order-cart-button';
import { HStack, VStack } from 'react-native-flex-layout';
import { CartCheckoutItemPrice } from '@components/cart/cart-checkout-item-price';
import { OrderCartProp } from '@store/query/orders/props/order-cart.prop';
import { ToastService } from '@services/toast.service';
import CartSelectors from '@store/cart/cart.selectors';
import { OrdersActions } from '@store/orders/orders.store';

export default function OrderCheckout() {
    const dispatch = useAppDispatch();
    const { colors } = useTheme();

    const [orderCart, { isLoading, isSuccess }] = useOrderCartMutation();

    const data = useAppSelector(CartSelectors.getCurrentOrder);
    const cartUpdating = useAppSelector(CartSelectors.isUpdating);

    const positionIds = data.map(item => item.positionId);

    useFocusEffect(
        useCallback(() => {
            dispatch(TabBarActions.hideTabBar());

            return () => {
                dispatch(TabBarActions.showTabBar());
            }
        }, [])
    )
    useEffect(() => {
        if (data.length) {
            router.setParams({
                total: total.toString(),
                itemsNumber: itemsNumber.toString()
            })
        }
    }, [data]);
    useEffect(() => {
        isSuccess && router.back();
    }, [isSuccess]);

    const total = useMemo(() => data.reduce((acc, curr) => acc + curr.price * curr.quantity, 0), [data]);
    const itemsNumber = useMemo(() => data.reduce((acc, curr) => acc + +curr.quantity, 0), [data]);

    const handleOrder = useCallback(async () => {
        try {
            const copyData = data.slice();
            const cartOrderProp: OrderCartProp = {
                comment: 'Мобильный заказ',
                paymentMethod: 0,
                positionIds,
                shipmentAddress: 0,
                shipmentDate: '',
                shipmentMethod: 0,
                shipmentOffice: 0,
            }
            const result = await orderCart(cartOrderProp).unwrap()

            if (result.status === 1) {
                dispatch(OrdersActions.addItems(copyData));
                console.log('added to order:', copyData);
                ToastService.success(`Заказ №${Object.keys(result.orders)[0]} создан!`);
            }
            else ToastService.error(result.errorMessage);

        } catch (e) {

        }
    }, [data]);

    return (
        <>
            <VStack fill m={APP_MARGIN * 2} spacing={APP_MARGIN * 2} mb={0}>
                <Surface
                    mode='flat'
                    elevation={5}
                    style={[styles.surface, styles.list, { flex: 3 }]}
                >
                    <FlashList
                        estimatedItemSize={120}
                        numColumns={4}
                        data={data}
                        renderItem={({ item }) => <OrderCheckoutItem item={item}/>}
                    />
                </Surface>
                <Surface
                    mode='flat'
                    elevation={0}
                    style={[styles.surface, styles.list]}
                >
                    <HStack justify='between'>
                        <Text variant={'titleLarge'}>Итого</Text>
                        <Text variant={'titleLarge'}>{total.toLocaleString('ru')} ₽</Text>
                    </HStack>

                    <FlashList
                        fadingEdgeLength={160}
                        estimatedItemSize={50}
                        data={data}
                        renderItem={({ item }) => <CartCheckoutItemPrice outlineColor={colors.outline} item={item}/>}
                    />

                </Surface>
            </VStack>
            <Surface
                mode='flat'
                elevation={5}
                style={styles.orderButtonContainer}
            >
                <OrderCartButton loading={isLoading || cartUpdating} onPress={handleOrder} colors={colors} total={total}/>
            </Surface>
        </>
    )
}

const styles = StyleSheet.create({
    surface: {
        borderRadius: APP_MARGIN * 2,
        padding: APP_MARGIN * 2,
    },
    list: {
        flex: 1,
        minHeight: 120
    },
    orderButtonContainer: {
        padding: APP_MARGIN * 2,
        paddingBottom: APP_MARGIN * 4,
        borderTopLeftRadius: APP_MARGIN * 5,
        borderTopRightRadius: APP_MARGIN * 5
    }
})