import React from 'react';
import { MaterialStack } from '@shared/components/navigation/material-stack';
import { TransitionPresets } from '@react-navigation/stack';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { MaterialCartNavbar } from '@components/cart/material-cart-navbar';

export default function CartLayout() {

    return (
        <MaterialStack
            screenOptions={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
                header: (props) => <MaterialCartNavbar {...props} />
            }}
        >
            <MaterialStack.Screen
                name='index'
                options={{
                    title: 'Корзина'
                }}
            />
            <MaterialStack.Screen
                name='order-checkout'
                options={{
                    title: 'Оформление заказа',
                    headerShown: true,
                    presentation: 'modal',
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                    gestureResponseDistance: SCREEN_WIDTH / 4
                }}
                initialParams={{
                    back: true
                }}
            />
        </MaterialStack>
    )
}