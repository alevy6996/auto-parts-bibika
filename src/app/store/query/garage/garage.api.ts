import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@store/query/axios.query';
import { CarResponse } from '@store/query/garage/car.response';
import { CarProp } from '@store/query/garage/car.prop';

export const garageApi = createApi({
    reducerPath: 'garageApi',
    baseQuery: axiosBaseQuery({ baseUrl: 'user/garage/' }),
    endpoints(build) {
        return {
            garageList: build.query<CarResponse[], void>({
                query: () => ({
                    url: ''
                })
            }),
            getCar: build.query<CarResponse, number>({
                query: (carId) => ({
                    url: 'car',
                    params: {
                        carId
                    }
                })
            }),
            addCar: build.mutation<CarResponse, CarProp>({
                query: (car) => ({
                    url: 'add',
                    method: 'post',
                    params: {
                        ...car
                    }
                })
            }),
            updateCar: build.mutation<CarResponse, { carId: number, car: CarProp }>({
                query: ({ carId, car }) => ({
                    url: 'update',
                    method: 'post',
                    params: {
                        carId,
                        ...car
                    }
                })
            }),
            deleteCar: build.mutation<number, boolean>({
                query: (carId) => ({
                    url: 'delete',
                    method: 'post',
                    params: {
                        carId
                    }
                })
            }),
        };
    }
});

export const {
    useGarageListQuery,
    useGetCarQuery,
    useAddCarMutation,
    useUpdateCarMutation,
    useDeleteCarMutation
} = garageApi;
