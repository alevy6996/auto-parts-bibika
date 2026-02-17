import { FormBuilderConfigArray } from '@shared/types/form-builder-config-array.type';
import { TextInput } from 'react-native-paper';
import React from 'react';
import { PasswordTextInput } from '@shared/components/inputs/password-text-input';

export interface LoginFormValues {
    login: string,
    password: string,
}

export const defaultFormValues: LoginFormValues = {
    login: '',
    password: ''
};

export const loginFormConfig = (
    isLoading: boolean
): FormBuilderConfigArray => [
    {
        type: 'text',
        name: 'login',

        rules: {
            required: {
                value: true,
                message: 'Введите логин',
            },
        },

        textInputProps: {
            label: 'Логин',
            left: <TextInput.Icon icon={'account'}/>,
            disabled: isLoading,
        },
    },
    {
        type: 'custom',
        name: 'password',

        rules: {
            required: {
                value: true,
                message: 'Введите пароль',
            },
        },
        textInputProps: {
            label: 'Пароль',
            disabled: isLoading
        },

        JSX: props => <PasswordTextInput {...props}/>
    },
];
