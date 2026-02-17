import React, {Fragment} from 'react';
import {useState} from 'react';
import {HelperText, TextInput} from 'react-native-paper';
import {LogicProps} from 'react-native-paper-form-builder/dist/Types/Types';
import {useController} from 'react-hook-form';

export const PasswordTextInput = (props: LogicProps) => {
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [passIcon, setPassIcon] = useState('eye');

    const {textInputProps, name, rules, shouldUnregister, defaultValue, control} = props;
    const {field, formState} = useController({
        name,
        rules,
        shouldUnregister,
        defaultValue,
        control,
    });
    const changePasswordVisibility = () => {
        if (passIcon == 'eye') setPassIcon('eye-off');
        else setPassIcon('eye');
        setSecureTextEntry(!secureTextEntry);
    };
    const errorMessage = formState.errors?.[field.name]?.message;

    return (
        <Fragment>
            <TextInput
                mode='outlined'
                {...field}
                onChangeText={field.onChange}
                {...textInputProps}
                error={!!errorMessage}
                defaultValue={''}
                secureTextEntry={secureTextEntry}
                left={<TextInput.Icon icon={'lock'}/>}
                right={<TextInput.Icon icon={passIcon} onPress={changePasswordVisibility}/>}
            />
            {/* @ts-ignore */}
            {errorMessage && <HelperText type={'error'}>{errorMessage}</HelperText>}
        </Fragment>
    );
};
