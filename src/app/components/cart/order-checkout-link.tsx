import React from 'react';
import { Button } from 'react-native-paper';
import { router } from 'expo-router';

export const OrderCheckoutLink = () => {

    const redirect = () => {
        router.navigate({
            pathname: 'cart/order-checkout',
        })
    }

    return (
        <Button
            mode='contained'
            contentStyle={{ flexDirection: 'row-reverse' }}
            icon={{ source: 'arrow-right', direction: 'auto' }}
            onPress={redirect}
        >
            К оформлению
        </Button>
    )
}