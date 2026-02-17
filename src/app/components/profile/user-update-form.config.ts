import { FormBuilderConfigArray } from '@shared/types/form-builder-config-array.type';

export interface UserUpdateFormValues {
    password: string;
    passwordConfirm: string;
}

export const defaultUserUpdateFormValues: UserUpdateFormValues = {
    password: '',
    passwordConfirm: '',
}

export const userUpdateFormConfig: FormBuilderConfigArray = [
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
            label: 'Новый пароль'
        }
    },
    {
        type: 'text',
        name: 'passwordConfirm',

        rules: {
            required: {
                value: true,
                message: 'Введите подтверждение пароля'
            },
            validate: (value, formValues) => {
                if(value !== formValues.password)
                    return 'Пароли не совпадают!'
            }
        },

        textInputProps: {
            label: 'Повторите пароль'
        }
    },

]