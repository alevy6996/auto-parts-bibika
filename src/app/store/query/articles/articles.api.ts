import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@store/query/axios.query';
import { ArticlesBrandsResponse } from '@store/query/articles/responses/articles-brands.response';
import { ArticleInfoResponse } from '@store/query/articles/responses/article-info.response';
import * as SecureStore from 'expo-secure-store';
import axios, { AxiosError } from 'axios';
import { ItemModel } from '@shared/models/item.model';

export const articlesApi = createApi({
    reducerPath: 'articlesApi',
    baseQuery: axiosBaseQuery({ baseUrl: 'articles/' }),
    endpoints(build) {
        return {
            allBrands: build.query<ArticlesBrandsResponse, void>({
                query: () => ({
                    url: 'brands',
                })
            }),
            // needs API admin info
            infoBatch: build.mutation<ArticleInfoResponse, ItemModel[]>({
                queryFn: async (articles) => {
                    try {
                        const userlogin = await SecureStore.getItemAsync('apiLogin');
                        const userpsw = await SecureStore.getItemAsync('apiPass');
                        const localUrl = process.env['EXPO_PUBLIC_LOCAL_API_URL'];

                        const result = await axios.get<ArticleInfoResponse>(`${localUrl}/api/cp/articles/info`, {
                            params: {
                                userlogin,
                                userpsw,
                                articles
                            }
                        });
                        return { data: result.data };
                    } catch (axiosError) {
                        const err = axiosError as AxiosError;
                        return {
                            error: {
                                status: err.response?.status,
                                data: err.response?.data || err.message,
                            },
                        };
                    }
                }
            })
        };
    }
});

export const {
    useAllBrandsQuery,
} = articlesApi;
