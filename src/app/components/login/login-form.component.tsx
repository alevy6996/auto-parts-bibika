import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@shared/hooks';
import { useForm } from 'react-hook-form';
import { UserActions } from '@store/user/user.store';
import { Button } from 'react-native-paper';
import { VStack } from 'react-native-flex-layout';
import { FormBuilder } from 'react-native-paper-form-builder';
import { setHttpClientUserAuthData } from '@httpClient';
import { NetworkError } from '@shared/errors/network.error';
import { ResponseService } from '@services/response.service';
import { ToastService } from '@services/toast.service';
import { useCheckAuthMutation } from '@store/query/local/local.api';
import { defaultFormValues, loginFormConfig, LoginFormValues } from '@components/login/login-form.config';
import md5 from 'md5';
import { SecureStoreService } from '@services/secure-store.service';
import { APP_MARGIN } from '@shared/consts/app.const';

type OnLoadingFunction = (value: boolean) => void

interface LoginFormProps {
    onLoading: OnLoadingFunction,
}

export default function LoginForm({ onLoading }: LoginFormProps) {
    const [isLoading, setIsLoading] = useState(false);

    const [checkAuth] = useCheckAuthMutation();

    const dispatch = useAppDispatch();
    const { control, setFocus, handleSubmit } = useForm({
        defaultValues: defaultFormValues
    });

    useEffect(() => {
        onLoading(isLoading);
    }, [isLoading]);

    const submitForm = async ({ login, password }: LoginFormValues) => {
    try {
        // ВРЕМЕННО: тестовые данные для входа
        // Любой логин/пароль будет работать
        const testUser = {
            id: 1,
            name: "Тестовый Пользователь",
            login: login || "test",
            // Добавьте сюда поля, которые нужны вашему приложению
            // Например:
            email: "test@example.com",
            role: "user",
            // посмотрите в user-state.model.ts какие поля нужны
        };

        // Сохраняем тестовые данные в SecureStore
        await SecureStoreService.setUserData(
            login || "test", 
            md5(password || "test")  // Хэшируем как в оригинале
        );

        // Устанавливаем данные для HTTP клиента
        setHttpClientUserAuthData(login || "test", password || "test");

        // Отправляем пользователя в Redux store
        dispatch(UserActions.setUser(testUser));
        
        // Убираем лоадер
        setIsLoading(false);
        
    } catch (err) {
        setIsLoading(false);
        ToastService.error("Ошибка входа, но мы всё равно пустим :)");
        
        // ДАЖЕ при ошибке пускаем с тестовыми данными
        const fallbackUser = {
            id: 1,
            name: "Тестовый Пользователь (fallback)",
            login: login || "test",
        };
        dispatch(UserActions.setUser(fallbackUser));
    }
};

    return (
        <VStack spacing={30} fill justify='center'  mh={4 * APP_MARGIN}>
            <FormBuilder
                control={control}
                setFocus={setFocus}
                formConfigArray={loginFormConfig(isLoading)}
            />

            <Button
                mode='contained'
                onPress={() => {
                    setIsLoading(true);

                    setTimeout(() => 
                        void handleSubmit(submitForm,
                            () => {
                                setIsLoading(false);
                            })(), 0);
                }}
                disabled={isLoading}
                loading={isLoading}
            >
                {!isLoading && 'Войти'}
            </Button>

            <Button disabled={isLoading} style={{ alignSelf: 'center' }}>Забыли пароль?</Button>
        </VStack>
    );
}
