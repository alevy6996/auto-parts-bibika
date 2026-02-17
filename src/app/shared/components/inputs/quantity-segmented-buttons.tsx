import React, { useState } from 'react';
import { SegmentedButtons, Text } from 'react-native-paper';
import { VStack } from 'react-native-flex-layout';
import { StyleSheet } from 'react-native';

interface CartQuantityButtonsProps {
    maxQuantity: number,
    onSubmit: (quantity: number) => void,
    quantityMultiplier: number,
}

export const QuantitySegmentedButtons = ({ maxQuantity, onSubmit, quantityMultiplier }: CartQuantityButtonsProps) => {
    const [value, setValue] = useState('0');
    const [quantity, setQuantity] = useState(quantityMultiplier);
    const [available, setAvailable] = useState(maxQuantity);

    const increase = (itemsNumber: number) => {
        let nextQuantity = quantity + itemsNumber;
        if (nextQuantity > available)
            nextQuantity = available;

        setQuantity(nextQuantity);
    }
    const decrease = (itemsNumber: number) => {
        let nextQuantity = quantity - itemsNumber;
        if (nextQuantity < quantityMultiplier)
            nextQuantity = quantityMultiplier;

        setQuantity(nextQuantity);
    }

    const handleSubmit = (item: string) => {
        if (item !== 'cart') return;

        setValue(item);

        setAvailable(available - quantity);
        onSubmit(quantity);
        setTimeout(() => {
            setValue('')
        }, 1000);
    }

    return (
        <VStack fill>
            <Text style={{ marginLeft: 8 }}>В наличии: {available} шт.</Text>
            <SegmentedButtons
                style={{
                    marginTop: 8
                }}
                buttons={[
                    {
                        value: '- 10',
                        label: `- ${10 * quantityMultiplier}`,
                        style: styles.reset,
                        labelStyle: styles.reset,
                        onPress: () => decrease(10 * quantityMultiplier)
                    },
                    {
                        value: '- 1',
                        label: `- ${quantityMultiplier}`,
                        style: styles.reset,
                        labelStyle: styles.reset,
                        onPress: () => decrease(quantityMultiplier)
                    },
                    {
                        value: 'cart',
                        label: quantity.toString(),
                        style: styles.reset,
                        labelStyle: styles.reset,
                        icon: 'cart',
                        showSelectedCheck: true,
                    },
                    {
                        value: '+ 1',
                        label: `+ ${quantityMultiplier}`,
                        style: styles.reset,
                        labelStyle: styles.reset,
                        onPress: () => increase(quantityMultiplier)
                    },
                    {
                        value: '+ 10',
                        label: `+ ${10 * quantityMultiplier}`,
                        style: styles.reset,
                        labelStyle: styles.reset,
                        onPress: () => increase(10 * quantityMultiplier)
                    }
                ]}
                value={value}
                onValueChange={handleSubmit}
            />
        </VStack>
    )
}

const styles = StyleSheet.create({
    reset: {
        padding: 0,
        paddingHorizontal: 0,
        paddingVertical: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingEnd: 0,
        margin: 0,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        marginEnd: 0,
        marginVertical: 0,
        marginHorizontal: 0,
        marginStart: 0,
        minWidth: 0
    }
})