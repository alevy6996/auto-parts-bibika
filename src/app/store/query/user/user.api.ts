import { createApi } from '@reduxjs/toolkit/query/react';

import { UserState } from '@store/user/user-state.model';
import { UserProp } from '@store/query/user/user.prop';
import { NewUserResponse } from '@store/query/user/responses/user-new.response';
import { SuccessResponse } from '@shared/responses/success.response';
import { axiosBaseQuery } from '@store/query/axios.query';
import { SecureStoreService } from '@services/secure-store.service';
import { UserActions } from '@store/user/user.store';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: axiosBaseQuery({ baseUrl: 'user/' }),
    endpoints(build) {
        return {
            registration: build.mutation<NewUserResponse, UserProp>({
                query: (user: UserProp) => ({
                    url: 'new',
                    method: 'post',
                    params: { ...user }
                })
            }),
            userActivation: build.mutation<NewUserResponse, { userCode: number, activationCode: string }>({
                query: ({ userCode, activationCode }) => ({
                    url: 'activation',
                    method: 'post',
                    params: {
                        userCode,
                        activationCode
                    }
                })
            }),
            auth: build.mutation<UserState, void>({
                query: () => ({
                    url: 'info'
                })
            }),
            /**
             * ## Механизм использования
             * ##### Восстановление пароля состоит из двух этапов:
             *
             * 1. **Запрос восстановления пароля с указанием номера телефона или email.
             *      В результате успешного завершения будет отправлено
             *      стандартное письмо со ссылкой восстановления пароля
             *      на указанный email или код в SMS на указанный номер телефона.**
             * 2. Сохранение нового пароля с указанием кода подтверждения из SMS.
             *      Данный этап актуален только для восстановления по номеру телефона,
             *      так как в случае с email, в письме придет ссылка на форму восстановления пароля на сайте,
             *      и второй этап будет выполнен в ней.
             */
            restorePasswordFirstStage: build.mutation<SuccessResponse, string>({
                query: (emailOrMobile) => ({
                    url: 'restore',
                    method: 'post',
                    params: {
                        emailOrMobile
                    }
                })
            }),
            restorePasswordSecondStage: build.mutation<SuccessResponse, { passwordNew: string, code: string }>({
                query: ({ passwordNew, code }) => ({
                    url: 'restore',
                    method: 'post',
                    params: {
                        passwordNew,
                        code
                    }
                })
            }),
            logout: build.mutation({
                queryFn: async (args, { dispatch }) => {
                    try {
                        await SecureStoreService.clearStore();
                        dispatch(UserActions.setUser(null));
                        return {
                            data: null
                        };
                    } catch(err) {
                        return {
                            error: err
                        };
                    }
                }
            })
        };
    }
});

export const {
    useRegistrationMutation,
    useUserActivationMutation,
    useAuthMutation,
    useRestorePasswordFirstStageMutation,
    useRestorePasswordSecondStageMutation,
    useLogoutMutation
} = userApi;
