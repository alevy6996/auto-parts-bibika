import { Appbar, useTheme } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { StackHeaderProps } from '@react-navigation/stack';
import React, { ReactNode } from 'react';

interface RouteParams {
    back: boolean,
    title: string,
}
export function MaterialNavBar({ navigation, route, options, back, children }: StackHeaderProps & { children?: ReactNode }) {
    const theme = useTheme();
    const routeParams = route.params as RouteParams;
    const title = routeParams?.title ?? getHeaderTitle(options, route.name);
    const backArrow = back && routeParams.back;

    return (
        <Appbar.Header style={{ backgroundColor: theme.colors.surface }} elevated={true}>
            {backArrow ? <Appbar.BackAction onPress={navigation.goBack}/> : null}
            <Appbar.Content title={title}/>
            {children && <Appbar.Content title={children}/>}
        </Appbar.Header>
    );
}
