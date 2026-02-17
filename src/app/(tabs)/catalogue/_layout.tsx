import { TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import { MaterialStack } from '@shared/components/navigation/material-stack';
import { MaterialNavBar } from '@shared/components/navigation/material-navbar';

export default function CatalogueLayout() {
    return (
        <MaterialStack
            screenOptions={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: true,
                header: (props) => <MaterialNavBar {...props} />
            }}
        >
            <MaterialStack.Screen
                name='index'
                options={{
                    title: 'Каталог',
                    headerShown: false
                }}
            />
            <MaterialStack.Screen
                name='quick-group-list'
                options={{
                    title: 'Каталог Laximo',
                }}
                initialParams={{
                    back: true
                }}
            />
            <MaterialStack.Screen
                name='quick-group-detail'
                options={{
                    title: 'Каталог Laximo',
                }}
                initialParams={{
                    back: true
                }}
            />
        </MaterialStack>
    )
}