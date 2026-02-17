import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '@store/query/axios.query';
import {SearchAdvicesResponse} from '@store/query/search/responses/advices.response';
import {ItemModel} from '@shared/models/item.model';
import {AdvicesBatchResponse} from '@store/query/search/responses/advices-batch.response';
import {SearchConstants} from '../../../shared/consts';
import * as SecureStore from 'expo-secure-store';

export const advicesApi = createApi({
    reducerPath: 'advicesApi',
    baseQuery: axiosBaseQuery({baseUrl: 'advices/'}),
    endpoints(build) {
        return {
            advices: build.query<SearchAdvicesResponse, { item: ItemModel, limit: number }>({
                query: ({item: {brand, number}, limit = SearchConstants.advicesLimit}) => ({
                    url: '',
                    params: {
                        brand,
                        number,
                        limit
                    }
                })
            }),
            advicesBatch: build.mutation<AdvicesBatchResponse[], { articles: ItemModel[], limit: number }>({
                query: ({articles, limit = SearchConstants.advicesLimit}) => ({
                    url: 'batch',
                    data: {
                        userlogin: SecureStore.getItem('userLogin'),
                        userpsw: SecureStore.getItem('userPassword'),
                        articles,
                        limit
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
            })
        };
    }
});

export const {
    useAdvicesQuery,
    useAdvicesBatchMutation
} = advicesApi;
