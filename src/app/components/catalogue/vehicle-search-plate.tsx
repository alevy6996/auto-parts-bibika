import { Button, Card, Divider, Text } from 'react-native-paper';
import { APP_MARGIN } from '@shared/consts/app.const';
import { Flex, VStack } from 'react-native-flex-layout';
import { Link } from 'expo-router';
import React from 'react';
import { FindVehicleByPlateNumberResponse } from '@store/query/laximo/responses/find-vehicle-by-plate-number.response';

interface VehicleSearchPlateProps {
    data: FindVehicleByPlateNumberResponse,
    onLinkPress?: () => void
}

export const VehicleSearchPlate = ({ data, onLinkPress }: VehicleSearchPlateProps) => {
    return (
        <Card style={{ margin: APP_MARGIN }}>
            <Card.Title title={data.name} subtitle={data.brand}/>
            <Card.Content>
                <Text variant='labelLarge'>
                    Каталог: {data.catalog}
                </Text>
                <Flex mt={APP_MARGIN * 2}>
                    <Text variant='titleSmall'>Атрибуты:</Text>
                    {data.attribute.map(item =>
                        <VStack key={item.key} mv={APP_MARGIN / 2}>
                            <Text><Text variant='titleMedium'>{item.name}</Text>: {item.value}</Text>
                            <Divider />
                        </VStack>)}
                </Flex>
            </Card.Content>
            <Card.Actions>
                <Link
                    href={{
                        pathname: '/(tabs)/catalogue/quick-group-list',
                        params: {
                            vehicleId: data.vehicleid,
                            catalog: data.catalog || '',
                            ssd: data.ssd,
                            brand: data.brand
                        }
                    }}
                    asChild
                >
                    <Button onPress={onLinkPress}>Перейти</Button>
                </Link>
            </Card.Actions>
        </Card>
    )
}