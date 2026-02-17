import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '@store/query/axios.query';
import {
    SearchBrand,
    SearchBrandsObjectResponse,
    searchBrandsObjectToArray
} from './responses/brands.response';
import {SearchArticlesResponse} from './responses/articles.response';
import {SearchHistoryResponse} from './responses/history.response';
import {SearchTipsResponse} from './responses/tips.response';
import {ItemModel} from '@shared/models/item.model';

export const searchApi = createApi({
    reducerPath: 'searchApi',
    baseQuery: axiosBaseQuery({baseUrl: 'search/'}),

    endpoints(build) {
        return {
            searchBrands: build.query<SearchBrand[], number | string>({
                query: (number) => ({
                    url: 'brands',
                    params: {
                        number
                    }
                }),
                transformResponse(baseQueryReturnValue: SearchBrandsObjectResponse) {
                    return searchBrandsObjectToArray(baseQueryReturnValue);
                }
            }),
            searchArticles: build.query<SearchArticlesResponse, ItemModel>({
                query: ({number, brand}) => ({
                    url: 'articles',
                    params: {
                        number,
                        brand,
                        useOnlineStocks: 1
                    }
                })
            }),
            searchAddToHistory: build.mutation<SearchArticlesResponse, ItemModel>({
                query: ({number, brand}) => ({
                    url: 'articles',
                    params: {
                        number,
                        brand
                    }
                })
            }),
            searchBatch: build.mutation<SearchArticlesResponse, ItemModel[]>({
                query: (searchData) => ({
                    url: 'batch',
                    method: 'post',
                    params: {
                        search: searchData
                    }
                })
            }),
            searchHistory: build.query<SearchHistoryResponse, void>({
                query: () => ({
                    url: 'history',
                }),
            }),
            searchTips: build.query<SearchTipsResponse, string | number>({
                query: (number) => ({
                    url: 'tips',
                    params: {
                        number
                    }
                })
            }),
        };
    }
});

export const {
    useSearchBrandsQuery,
    useSearchArticlesQuery,
    useSearchBatchMutation,
    useSearchAddToHistoryMutation,
    useSearchHistoryQuery,
    useSearchTipsQuery,
} = searchApi;
