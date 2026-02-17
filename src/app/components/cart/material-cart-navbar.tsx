import { Appbar, Text, useTheme } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { StackHeaderProps } from '@react-navigation/stack';
import React, { ReactNode } from 'react';
import { VStack } from 'react-native-flex-layout';
import { getNoun } from '@shared/features/get-noun';

interface RouteParams {
    back: boolean,
    total: string,
    itemsNumber: string;
}
export function MaterialCartNavbar({ navigation, route, options, back, children }: StackHeaderProps & { children?: ReactNode }) {
    const theme = useTheme();
    const routeParams = route.params as RouteParams;
    const title = getHeaderTitle(options, route.name);
    const backArrow = back && routeParams.back;

    const total = routeParams.total ? parseInt(routeParams.total) : null;
    const itemsNumber = routeParams.itemsNumber ? parseInt(routeParams.itemsNumber) : null;
    const getItemsNoun = getNoun.bind(null, 'товар', 'товара', 'товаров');

    return (
        <Appbar.Header style={{ backgroundColor: theme.colors.surface }} elevated={true}>
            {backArrow ? <Appbar.BackAction onPress={navigation.goBack}/> : null}
            {total && itemsNumber ?
                <VStack>
                    <Text variant={'headlineSmall'}>{title}</Text>
                    <Text>{itemsNumber} {getItemsNoun(itemsNumber)}, {total.toLocaleString('ru')} ₽</Text>
                </VStack>
                :
                <Appbar.Content mode='center-aligned' title={title}/>

            }

            {children && <Appbar.Content title={children}/>}
        </Appbar.Header>
    );
}
