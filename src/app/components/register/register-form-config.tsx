import { FormBuilderConfigArray } from '@shared/types/form-builder-config-array.type';
import { MaskedTextInput } from '@shared/components/inputs/masked-text-input';
import React from 'react';
import { MaskConstants } from '@shared/consts';
import { MaterialDateInput } from '@shared/components/inputs/material-date-input';

export interface RegisterFormValues {
    lastname: string,
    name: string,
    patronymic: string,
    phoneNumber: string,
    email: string,
    password: string,
    passwordConfirm: string,
    birthDate: string,
    city: string,
}

export const defaultRegisterFormValues: RegisterFormValues = {
    birthDate: '',
    city: '',
    email: '',
    lastname: '',
    name: '',
    password: '',
    passwordConfirm: '',
    patronymic: '',
    phoneNumber: '',
};

export const registerRetailConfig: FormBuilderConfigArray = [
    [{
        type: 'text',
        name: 'lastName',

        rules: {
            required: {
                value: true,
                message: 'Введите фамилию'
            }
        },

        textInputProps: {
            label: 'Фамилия',
        }
    },
    {
        type: 'text',
        name: 'name',

        rules: {
            required: {
                value: true,
                message: 'Введите имя'
            }
        },

        textInputProps: {
            label: 'Имя',
        }
    }],
    {
        type: 'text',
        name: 'patronymic',

        textInputProps: {
            label: 'Отчество',
        }
    },
    {
        type: 'custom',
        name: 'phoneNumber',

        rules: {
            required: {
                value: true,
                message: 'Введите номер телефона'
            },
            pattern: {
                value: /9[0-9]{9}/,
                message: 'Введите корректный номер телефона'
            }
        },

        textInputProps: {
            label: 'Номер телефона',
        },
        JSX: (props) => <MaskedTextInput props={props} mask={MaskConstants.phoneNumberMask}/>
    },
    {
        type: 'email',
        name: 'email',

        textInputProps: {
            label: 'Email',
        }
    },
    {
        type: 'text',
        name: 'password',

        rules: {
            required: {
                value: true,
                message: 'Введите пароль'
            }
        },

        textInputProps: {
            label: 'Пароль',
            secureTextEntry: true
        }
    },
    {
        type: 'text',
        name: 'passwordConfirm',

        rules: {
            required: {
                value: true,
                message: 'Подтвердите пароль'
            }
        },

        textInputProps: {
            label: 'Подтверждение пароля',
            secureTextEntry: true
        }
    },
    {
        type: 'custom',
        name: 'birthDate',

        rules: {
            required: {
                value: true,
                message: 'Введите дату рождения'
            }
        },

        JSX: props => <MaterialDateInput props={props}/>
    },
    {
        type: 'text',
        name: 'city',

        textInputProps: {
            label: 'Город',
        }
    },

];
