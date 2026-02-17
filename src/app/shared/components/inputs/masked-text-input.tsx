import React, { Fragment } from 'react';
import { LogicProps } from 'react-native-paper-form-builder/dist/Types/Types';
import { useController } from 'react-hook-form';
import { HelperText, TextInput } from 'react-native-paper';
import { Mask, useMaskedInputProps } from 'react-native-mask-input';

export const MaskedTextInput = ({ props, mask }: { props: LogicProps, mask: Mask }) => {
    const { textInputProps ,name, rules, shouldUnregister, defaultValue, control } = props;
    const { field, formState } = useController({
        name,
        rules,
        shouldUnregister,
        defaultValue,
        control,
    });

    const maskedInputProps = useMaskedInputProps({
        value: field.value,
        onChangeText: (masked, unmasked) => field.onChange(unmasked),
        mask: mask,
    });

    const errorMessage = formState.errors?.[field.name]?.message;

    return (
        <>
            <TextInput
                mode='outlined'
                {...textInputProps}
                {...maskedInputProps}
                error={!!errorMessage}
                defaultValue=''
            />
            {/* @ts-ignore */}
            {errorMessage && <HelperText type={'error'}>{errorMessage}</HelperText>}
        </>
    );
};
