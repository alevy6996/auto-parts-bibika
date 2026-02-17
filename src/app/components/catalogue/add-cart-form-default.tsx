import { FormBuilderConfigArray } from '@shared/types/form-builder-config-array.type';
import { CarProp } from '@store/query/garage/car.prop';
import { TextInput } from 'react-native-paper';
import React from 'react';

export const addCartFormDefaultValue: CarProp = {
    vin: '',
    comment: '',
    frame: '',
    manufacturerId: '',
    mileage: '',
    modelId: '',
    modificationId: '',
    name: '',
    vehicleRegPlate: '',
    year: ''
}

export const addCartFormConfig = (disabled: boolean): FormBuilderConfigArray => [
    {
        type: 'text',
        name: 'vin',

        rules: {
            required: {
                value: true,
                message: 'Введите VIN'
            },
            minLength: {
                value: 17,
                message: 'Длина VIN-номера минимум 17 символов'
            },
            maxLength: {
                value: 17,
                message: 'Длина VIN-номера максимум 17 символов'
            },
        },

        textInputProps: {
            label: 'VIN',
            right: <TextInput.Icon size={20} icon={'asterisk'}/>,
            disabled,
        },
    },
    {
        type: 'text',
        name: 'name',

        textInputProps: {
            label: 'Название',
            disabled,
        },
    },
    {
        type: 'text',
        name: 'frame',

        textInputProps: {
            label: 'Frame',
            disabled,
        },
    },
]
export const addCartFormComment = (disabled: boolean): FormBuilderConfigArray => [
    {
        type: 'text',
        name: 'comment',

        textInputProps: {
            label: 'Комментарий',
            disabled,
            multiline: true,
            numberOfLines: 3
        },
    },
]