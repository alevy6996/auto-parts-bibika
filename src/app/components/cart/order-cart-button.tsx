import React from 'react';
import { ActivityIndicator, Text } from 'react-native-paper';
import { ButtonProps, Pressable, StyleSheet } from 'react-native';
import { HStack } from 'react-native-flex-layout';
import { APP_MARGIN } from '@shared/consts/app.const';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';

interface OrderCartButtonProps {
    colors: MD3Colors,
    total: number,
    onPress: ButtonProps['onPress'],
    loading?: boolean
}

export const OrderCartButton = ({ colors, total, onPress, loading = false }: OrderCartButtonProps) => {

    return (
        <Pressable
            disabled={loading}
            style={[styles.button, {
                backgroundColor: loading ? colors.outline : colors.primary
            }]}
            onPress={onPress}
        >
            {loading ?
                <ActivityIndicator size={'small'} color={colors.surface} /> :
                <ButtonText color={colors.onPrimary} total={total} />}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: APP_MARGIN * 2,
        paddingHorizontal: APP_MARGIN * 2,
        borderRadius: APP_MARGIN * 3
    }
})

const ButtonText = ({ color, total }: { color: string, total: number }) => {
    return (
        <HStack justify={'between'}>
            <Text
                variant='titleMedium'
                style={{
                    color
                }}
            >Заказать</Text>
            <Text
                variant='titleMedium'
                style={{
                    color
                }}
            >{total.toLocaleString('ru')} ₽</Text>
        </HStack>
    )
}