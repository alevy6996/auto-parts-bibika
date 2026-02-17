import { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/react';
import HttpClient from '@httpClient';
import { NetworkError } from '@shared/errors/network.error';

export const axiosBaseQuery =({ baseUrl = '', axiosInstance = HttpClient }: { baseUrl?: string, axiosInstance?: AxiosInstance }): BaseQueryFn<
    {
        url: string
        method?: AxiosRequestConfig['method']
        data?: AxiosRequestConfig['data']
        params?: AxiosRequestConfig['params']
        headers?: AxiosRequestConfig['headers']
    }
> =>
    async ({ url, method, data, params, headers }) => {
        try {
            const result = await axiosInstance({
                url: baseUrl + url,
                method,
                data,
                params,
                headers,
            });
            return { data: result.data };
        } catch (axiosError) {
            const err = axiosError as AxiosError;
            return {
                error: {
                    status: err.response?.status || err?.code || err?.status,
                    data: err.response?.data || err.message,
                } as NetworkError
            };
        }
    };
