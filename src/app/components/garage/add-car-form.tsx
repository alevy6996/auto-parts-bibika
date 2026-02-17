import { Button } from 'react-native-paper';
import React, { useState } from 'react';
import { Flex } from 'react-native-flex-layout';
import { useForm } from 'react-hook-form';
import {
    addCartFormComment,
    addCartFormConfig,
    addCartFormDefaultValue
} from '@components/catalogue/add-cart-form-default';
import { FormBuilder } from 'react-native-paper-form-builder';
import { APP_MARGIN } from '@shared/consts/app.const';
import { CarProp } from '@store/query/garage/car.prop';
import { useAddCarMutation } from '@store/query/garage/garage.api';
import { ToastService } from '@services/toast.service';

export const AddCarForm = () => {
    const [disabled, setDisabled] = useState(false);

    const { control, setFocus, handleSubmit } = useForm({
        defaultValues: addCartFormDefaultValue
    });

    const [addCar] = useAddCarMutation();

    const submitForm = async (form: Partial<CarProp>) => {
        try {
            const prop = Object.fromEntries(Object.entries(form)
                .map(([key, value]) => {
                    if (!value) return null;
                    return [key, value]
                })
                .filter(item => item) as string[][]) as Partial<CarProp>;
            const result = await addCar({ ...addCartFormDefaultValue, ...prop }).unwrap();
            ToastService.success(result.vin + 'добавлен успешно');
        } catch (e) {
        }
    }

    return (
        <Flex fill justify='center' mh={2 * APP_MARGIN}>

            <FormBuilder
                control={control}
                setFocus={setFocus}
                formConfigArray={[
                    ...addCartFormConfig(disabled),
                    ...addCartFormComment(disabled)
                ]}
            />
            <Button
                mode='contained'
                disabled={disabled}
                loading={disabled}
                onPress={() => {
                    setDisabled(true);
                    setTimeout(
                        () => void handleSubmit(
                            (data) => {
                                void submitForm(data)
                                    .then(() => setDisabled(false));
                            },
                            () => setDisabled(false)
                        )(), 0);
                }}
            >Добавить</Button>
        </Flex>
    )
}