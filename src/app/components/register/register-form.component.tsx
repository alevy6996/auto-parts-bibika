import React, { useState } from 'react';
import { FormBuilder } from 'react-native-paper-form-builder';
import {
    defaultRegisterFormValues,
    RegisterFormValues,
    registerRetailConfig
} from '@components/register/register-form-config';
import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import { Button, TextInput, TextInputProps } from 'react-native-paper';
import { useRegistrationMutation } from '@store/query/user/user.api';
import { UserProp } from '@store/query/user/user.prop';
import { useExpoRouter } from 'expo-router/build/global-state/router-store';
import { router } from 'expo-router';

export default function RegisterForm() {
    const [isLoading, setIsLoading] = useState(false);

    const { control, setFocus, handleSubmit } = useForm({
        defaultValues: defaultRegisterFormValues
    });
    const [register] = useRegistrationMutation();

    const submitForm = async (formData: RegisterFormValues) => {
        try {
            await register(formData as unknown as UserProp).unwrap();
            router.back();
        } catch (e) {
            setIsLoading(false);
        }
    };


    return (
        <ScrollView style={{ marginBottom: 20 }}>
            <FormBuilder
                // eslint-disable-next-line react/display-name
                CustomTextInput={React.forwardRef((props: TextInputProps, ref) => (
                    <TextInput {...props} placeholder={props.label as string || props.placeholder} label={''}
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        ref={ref}/>
                ))
                }
                formConfigArray={registerRetailConfig}
                control={control}
                setFocus={setFocus}
            />

            <Button
                disabled={isLoading}
                loading={isLoading}
                mode='contained'
                onPress={() => {
                    setIsLoading(true);
                    setTimeout(() => 
                        void handleSubmit(
                            submitForm,
                            () => setIsLoading(false)
                        )()
                    , 0)
                }}
            >
                {!isLoading && 'Зарегистрироваться'}
            </Button>
        </ScrollView>
    );
}
