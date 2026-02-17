import React, { useEffect, useState } from 'react';
import { IconButton, TextInput, useTheme } from 'react-native-paper';
import { HStack } from 'react-native-flex-layout';
import { StyleSheet } from 'react-native';
import { APP_MARGIN } from '@shared/consts/app.const';
interface QuantityButtonsProps {
    maxQuantity: number;
    quantityMultiplier?: number;
    value: number;
    setValue: (value: number) => void;
    input: string;
    onInput: (value: string) => void;
}
export const QuantityButtons = (
    {
        maxQuantity,
        quantityMultiplier = 1,
        value,
        setValue,
        input,
        onInput
    }: QuantityButtonsProps) => {
    const theme = useTheme();

    const increase = () => handleChange(+value + +quantityMultiplier);
    const decrease = () => handleChange(value - quantityMultiplier);

    const handleChange = (newValue: number) => {
        if(isNaN(newValue)) return;

        if (newValue > maxQuantity)
            newValue = maxQuantity;
        else if (newValue < quantityMultiplier)
            newValue = quantityMultiplier;

        onInput(newValue.toString());
        setValue(newValue);
    }

    return (
        <HStack center spacing={8}>
            <IconButton
                style={[styles.iconButton, {
                    backgroundColor: theme.colors.onPrimary,
                }]}
                iconColor={theme.colors.primary}
                onPress={decrease}
                icon={'minus'}
            />
            <TextInput
                outlineStyle={styles.iconButton}
                style={styles.input}
                contentStyle={styles.inputContent}
                mode='outlined'
                keyboardType='numeric'
                value={input}
                onChangeText={onInput}
                onEndEditing={() => handleChange(parseInt(input))}
            />
            <IconButton
                style={[styles.iconButton, {
                    backgroundColor: theme.colors.primary,
                }]}
                iconColor={theme.colors.onPrimary}
                onPress={increase}
                icon={'plus'}
            />
        </HStack>
    )
}

const styles = StyleSheet.create({
    iconButton: {
        borderWidth: 1,
        margin: 0,
        borderRadius: APP_MARGIN
    },
    input: {
        alignItems: 'center',
        textAlign: 'center',
        width: 40,
        height: 40,
    },
    inputContent: {
        paddingBottom: 'auto',
        paddingTop: 'auto'
    }
})