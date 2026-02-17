import React from 'react';
import { MaterialStack } from '@shared/components/navigation/material-stack';
import { TransitionPresets } from '@react-navigation/stack';
import { MaterialNavBar } from '@shared/components/navigation/material-navbar';

export default function HomeLayout() {
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
                    title: 'Главная',
                }}
            />
            <MaterialStack.Screen
                name='search'
                options={{
                    title: 'Поиск',
                    headerShown: true,
                }}
                initialParams={{
                    back: true
                }}
            />
        </MaterialStack>
    );
}
