import React from 'react';
import { DatePickerInput } from 'react-native-paper-dates';
import { LogicProps } from 'react-native-paper-form-builder/dist/Types/Types';
import { useController } from 'react-hook-form';
import { HelperText } from 'react-native-paper';

interface MaterialDateInputProps {
    props: LogicProps
}

export const MaterialDateInput = ({ props }: MaterialDateInputProps) => {
    const { name, rules, shouldUnregister, defaultValue, control } = props;
    const { field, formState } = useController({
        name,
        rules,
        shouldUnregister,
        defaultValue,
        control,
    });

    const errorMessage = formState.errors?.[field.name]?.message;
    
    return (
        <>
            <DatePickerInput
                error={!!errorMessage}
                locale='ru'
                value={field.value}
                onChange={(date) => {
                    date && field.onChange(date);
                }}
                inputMode='start'
                mode='outlined'
            />
            {/* @ts-ignore */}
            {errorMessage && <HelperText type={'error'}>{errorMessage}</HelperText>}
        </>
    )
}