import { Icon, } from 'react-native-paper';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { useAppSelector } from '@shared/hooks';
import CartSelectors from '@store/cart/cart.selectors';
import { MaterialBottomTabs } from '@shared/components/navigation/material-bottom-tabs';
import TabBarSelectors from '@store/tab-bar/tab-bar.selectors';

export default function TabLayout() {
    const theme = useTheme();
    const isTabBarVisible = useAppSelector(TabBarSelectors.getVisibility);
    const cartLength = useAppSelector(CartSelectors.cartLength) || false;

    return (
        <MaterialBottomTabs
            barStyle={{
                display: isTabBarVisible ? 'flex' : 'none',
            }}
            theme={theme}
        >
            <MaterialBottomTabs.Screen
                name='home'
                options={{
                    title: 'Главная',
                    tabBarIcon: ({ color }) =>
                        <Icon size={30} source='home' color={color}/>,
                }}
            />
            <MaterialBottomTabs.Screen
                name='garage'
                options={{
                    title: 'Гараж',
                    tabBarIcon: ({ color, focused }) =>
                        <Icon size={30} source={focused ? 'garage-open' : 'garage'} color={color}/>,
                }}
            />
            <MaterialBottomTabs.Screen
                name='catalogue'
                options={{
                    title: 'Каталог',
                    tabBarIcon: ({ color }) =>
                        <Icon size={30} source='text-search' color={color}/>,
                }}
            />
            <MaterialBottomTabs.Screen
                name='cart'
                options={{
                    title: 'Корзина',
                    tabBarIcon: ({ color, focused }) =>
                        <Icon size={30} source={focused ? 'cart' : 'cart-outline'} color={color}/>,
                    tabBarBadge: cartLength,
                }}
            />
            <MaterialBottomTabs.Screen
                name='profile'
                options={{
                    title: 'Профиль',
                    tabBarIcon: ({ color, focused }) =>
                        <Icon size={30} source={focused ? 'account' : 'account-outline'} color={color}/>,
                }}
            />
        </MaterialBottomTabs>
    );
}
