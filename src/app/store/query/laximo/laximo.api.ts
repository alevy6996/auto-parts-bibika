import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@store/query/axios.query';
import { localHttpClient } from '@httpClient';
import { FindVehicleByVinResponse } from '@store/query/laximo/responses/find-vehicle-by-vin.response';
import { ListQuickGroupResponse } from '@store/query/laximo/responses/list-quick-group.response';
import { ListQuickGroupProp } from '@store/query/laximo/props/list-quick-group.prop';
import { ListQuickDetailProp } from '@store/query/laximo/props/list-quick-detail.prop';
import { ListQuickDetailResponse } from '@store/query/laximo/responses/list-quick-detail.response';
import { FindVehicleByPlateNumberResponse } from '@store/query/laximo/responses/find-vehicle-by-plate-number.response';

export const laximoApi = createApi({
    reducerPath: 'laximoApi',
    baseQuery: axiosBaseQuery({ baseUrl: 'laximo/', axiosInstance: localHttpClient }),
    endpoints(build) {
        return {
            findVehicleByVin: build.mutation<FindVehicleByVinResponse[], string>({
                query: (value) => ({
                    url: 'findVehicleByVin',
                    params: {
                        VIN: value
                    }
                })
            }),
            findVehicleByPlateNumber: build.mutation<FindVehicleByPlateNumberResponse, string>({
                query: (value) => ({
                    url: 'findVehicleByPlateNumber',
                    params: {
                        plateNumber: value
                    }
                })
            }),
            listQuickGroup: build.query<ListQuickGroupResponse, ListQuickGroupProp>({
                query: (params) => ({
                    url: 'listQuickGroup',
                    params
                })
            }),
            listQuickDetail: build.query<ListQuickDetailResponse, ListQuickDetailProp>({
                query: (params) => ({
                    url: 'listQuickDetail',
                    params
                })
            }),

        }
    }
})

export const {
    useFindVehicleByVinMutation,
    useListQuickGroupQuery,
    useListQuickDetailQuery,
    useFindVehicleByPlateNumberMutation
} = laximoApi;