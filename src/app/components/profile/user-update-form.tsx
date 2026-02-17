import { VStack } from 'react-native-flex-layout';
import React, { useState } from 'react';
import { FormBuilder } from 'react-native-paper-form-builder';
import { useForm } from 'react-hook-form';
import {
    defaultUserUpdateFormValues,
    userUpdateFormConfig,
    UserUpdateFormValues
} from '@components/profile/user-update-form.config';
import { Button } from 'react-native-paper';
import { useUpdateUserMutation } from '@store/query/local/local.api';
import { SecureStoreService } from '@services/secure-store.service';
import { ResponseService } from '@services/response.service';
import { ToastService } from '@services/toast.service';
import { NetworkError } from '@shared/errors/network.error';
import md5 from 'md5';
import { setHttpClientUserAuthData } from '@httpClient';
import { APP_MARGIN } from '@shared/consts/app.const';

const UserUpdateForm = () => {

    const [isLoading] = useState(false);
    const { control, setFocus, handleSubmit } = useForm({
        defaultValues: defaultUserUpdateFormValues
    });
    const [updateUser] = useUpdateUserMutation();

    const handleSubmitForm = async (values: UserUpdateFormValues) => {
        try {
            const { login, pass } = await SecureStoreService.getUserAuthData()

            if(!login || !pass) return;

            const user = await updateUser({ login, password: pass, newPassword: values.password }).unwrap();
            console.log(user);

            const hashPass = md5(values.password);
            await SecureStoreService.setUserData(login, hashPass);
            setHttpClientUserAuthData(login, hashPass);

            ToastService.success('Данные изменены!');
        } catch (err) {
            const errorMessage = ResponseService.getErrorMessage(err as NetworkError);
            ToastService.error(errorMessage);
        }
    }

    return (
        <VStack mh={APP_MARGIN * 2}>
            <FormBuilder
                formConfigArray={userUpdateFormConfig}
                control={control}
                setFocus={setFocus}
            />
            <Button
                disabled={isLoading}
                loading={isLoading}
                mode='contained'
                onPress={handleSubmit(values => handleSubmitForm(values))}
            >
                Подтвердить
            </Button>
        </VStack>
    )
}

export default UserUpdateForm;