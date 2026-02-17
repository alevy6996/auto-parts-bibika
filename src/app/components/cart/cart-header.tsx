import React from 'react';
import { Button, HelperText, Text, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { ShadowedView, shadowStyle } from 'react-native-fast-shadow';


interface CartHeaderProps {
    onClear: () => void;
    itemsNumber: number;
}

export const CartHeader = ({ onClear, itemsNumber }: CartHeaderProps) => {

    const theme = useTheme();

    return (
        <ShadowedView
            style={[shadowStyle({
                opacity: 0.1,
                radius: 2,
                offset: [0, 4]
            }), { zIndex: 1 }]
            }
        >
            <View
                style={[styles.surface, { backgroundColor: theme.colors.surface }]}
            >
                <Button
                    icon={'delete'}
                    onPress={onClear}
                    textColor={theme.colors.error}
                >
                    <Text
                        style={{
                            color: theme.colors.error
                        }}
                        variant='titleSmall'
                    >Очистить корзину
                    </Text>
                </Button>
                <Text>Позиций в корзине: {itemsNumber}</Text>
            </View>
        </ShadowedView>
    )
}

const styles = StyleSheet.create({
    surface: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
    }
})