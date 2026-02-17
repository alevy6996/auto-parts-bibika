import React from 'react';
import { TransitionPresets } from '@react-navigation/stack';
import { MaterialNavBar } from '@shared/components/navigation/material-navbar';
import { MaterialStack } from '@shared/components/navigation/material-stack';

export default function ProfileLayout() {
    return (
        <MaterialStack
            screenOptions={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
                header: (props) => <MaterialNavBar {...props} />
            }}
        >
            <MaterialStack.Screen
                name='index'
                options={{
                    title: 'Профиль',
                }}
            />
            <MaterialStack.Screen
                name='orders-list'
                options={{
                    title: 'Список заказов',
                    headerShown: true,
                }}
                initialParams={{
                    back: true
                }}
            />
        </MaterialStack>
    )
}