import { VStack } from 'react-native-flex-layout';
import { Button, Card, Text } from 'react-native-paper';
import React from 'react';
import { UserResponse } from '@store/query/user/responses/user.response';
import { router } from 'expo-router';

export const ProfileComponent = ({ user }: { user: UserResponse }) => {


    return (
        <VStack fill justify='center' spacing={30}>
            <Card>
                <Card.Title titleVariant='headlineLarge' title={`Привет, ${user.name}!`}/>
                <Card.Content>
                    <Text>Email: {user.email}</Text>
                    <Text>Номер телефона: {user.mobile}</Text>
                    <Text>Организация: {user.organization}</Text>

                </Card.Content>
                <Card.Actions>
                    <Button onPress={() => router.navigate('profile/orders-list')}>К заказам</Button>
                </Card.Actions>
            </Card>
        </VStack>
    )
}