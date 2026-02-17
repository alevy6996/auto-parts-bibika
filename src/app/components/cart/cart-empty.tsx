import React from 'react';
import { APP_MARGIN } from '@shared/consts/app.const';
import { View } from 'react-native';
import { Button, Icon, Text } from 'react-native-paper';
import { Link } from 'expo-router';
import { VStack } from 'react-native-flex-layout';

export const CartEmpty = () => {
    return (
        <VStack fill center spacing={APP_MARGIN * 2}>
            <View>
                <Icon size={100} source='cart-outline'/>
            </View>
            <Text>В корзине пока ничего нет</Text>
            <Link href={'/home/'} asChild>
                <Button
                    mode='outlined'
                    onPress={() => {}}
                >На главную
                </Button>
            </Link>
        </VStack>
    )
}