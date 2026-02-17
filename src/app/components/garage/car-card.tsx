import { Button, Card, IconButton, Text, useTheme } from 'react-native-paper';
import { APP_MARGIN } from '@shared/consts/app.const';
import { HStack } from 'react-native-flex-layout';
import React from 'react';
import { CarResponse } from '@store/query/garage/car.response';
import { Link } from 'expo-router';

interface CarCartProps {
    car: CarResponse
}
export const CarCard = ({ car }: CarCartProps) => {

    const { colors } = useTheme();

    return (
        <Card style={{ margin: APP_MARGIN }}>
            <Card.Title title={car.manufacturer} subtitle={car.vin}/>
            <Card.Content>
                {car.name && <Text variant={'titleMedium'}>{car.name}</Text>}
                {car.comment && <Text>Примечание: {car.comment}</Text>}
            </Card.Content>
            <Card.Actions>
                <Link
                    href={{
                        pathname: '/(tabs)/catalogue/',
                        params: {
                            redirectedVIN: car.vin
                        }
                    }}
                    asChild
                >
                    <Button icon={'magnify'}>Перейти в каталог</Button>
                </Link>
            </Card.Actions>
            <HStack position='absolute' right={0} spacing={APP_MARGIN}>
                <IconButton disabled icon={'pencil'} />
                <IconButton disabled icon={'delete'} iconColor={colors.error}/>
            </HStack>
        </Card>
    )
}