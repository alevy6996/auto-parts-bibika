import { FindVehicleByVinResponse } from '@store/query/laximo/responses/find-vehicle-by-vin.response';
import { Button, Card, Text } from 'react-native-paper';
import { APP_MARGIN } from '@shared/consts/app.const';
import { concatValues } from '@shared/features/concat-object-values';
import { Link } from 'expo-router';
import React from 'react';

interface VehicleSearchVinProps {
    data: FindVehicleByVinResponse[] ,
    onLinkPress?: () => void
}

export const VehicleSearchVin = ({ data, onLinkPress }: VehicleSearchVinProps) => {
    return (
        <>
            {data.map((item: FindVehicleByVinResponse) => {
                return (
                    <Card key={item.vehicleid} style={{ marginBottom: APP_MARGIN, margin: APP_MARGIN }}>
                        <Card.Title title={item.name} subtitle={item.brand}/>
                        <Card.Content>
                            <Text variant='labelLarge'>Каталог: {item.catalog}</Text>
                            <Text 
                                variant='bodySmall'
                                numberOfLines={16}
                            >
                                {concatValues(item, ['name', 'brand', 'vehicleid', 'sysproperty', 'ssd', 'catalog'])}
                            </Text>
                        </Card.Content>
                        <Card.Actions>
                            <Link
                                href={{
                                    pathname: '/(tabs)/catalogue/quick-group-list',
                                    params: {
                                        vehicleId: item.vehicleid,
                                        catalog: item.catalog,
                                        ssd: item.ssd,
                                        brand: item.brand
                                    }
                                }}
                                asChild
                            >
                                <Button onPress={onLinkPress}>Перейти</Button>
                            </Link>
                        </Card.Actions>
                    </Card>
                )
            })}
        </>
    )
}