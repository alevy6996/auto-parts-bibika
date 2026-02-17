import React from 'react';
import { HelperText } from 'react-native-paper';
import { FindVehicleByVinResponse } from '@store/query/laximo/responses/find-vehicle-by-vin.response';
import { MaterialActivityIndicator } from '@shared/components/material-activity-indicator';
import { VehicleSearchVin } from '@components/catalogue/vehicle-search-vin';
import { FindVehicleByPlateNumberResponse } from '@store/query/laximo/responses/find-vehicle-by-plate-number.response';
import { VehicleSearchPlate } from '@components/catalogue/vehicle-search-plate';
import { useBottomSheet } from '@gorhom/bottom-sheet';

interface VehicleSearchProps {
    data?: FindVehicleByVinResponse[] | FindVehicleByPlateNumberResponse,
    isLoading?: boolean;
}

export const VehicleSearch = ({ data, isLoading = false }: VehicleSearchProps) => {
    const { close } = useBottomSheet()

    const handleLinkPress = () => close();

    if (isLoading) return <MaterialActivityIndicator elevation={0}/>
    if (!data) return <HelperText type='info'>Нет результатов</HelperText>

    if (Array.isArray(data)) return <VehicleSearchVin onLinkPress={handleLinkPress} data={data}/>

    return <VehicleSearchPlate onLinkPress={handleLinkPress} data={data}/>;
}