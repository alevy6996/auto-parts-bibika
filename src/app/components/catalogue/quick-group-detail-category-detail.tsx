import { StyleSheet } from 'react-native';
import { Divider, IconButton, useTheme } from 'react-native-paper';
import { APP_MARGIN } from '@shared/consts/app.const';
import { router } from 'expo-router';
import { Flex, HStack } from 'react-native-flex-layout';
import React from 'react';
import { ListQuickDetailDetail } from '@store/query/laximo/responses/list-quick-detail.response';
import { SearchDetailLink } from '@components/catalogue/quick-group-detail-search-link';

interface QuickGroupDetailCategoryDetailProps {
    detail: ListQuickDetailDetail;
    brand: string;
    number: string;
    onInfoPress?: () => void;
}

export const QuickGroupDetailCategoryDetail = (
    {
        onInfoPress = () => {
        }, brand, number, ...props
    }: QuickGroupDetailCategoryDetailProps) => {

    return (
        <Flex h={120}>
            <Divider/>
            <HStack h={116} justify='between' items='center'>
                <HStack
                    style={styles.wrapper}
                    fill
                    spacing={APP_MARGIN}
                >
                    <IconButton
                        onPress={onInfoPress}
                        icon={'information'}
                    />
                    <SearchDetailLink {...props}/>
                </HStack>
                <IconButton
                    onPress={() => router.navigate({
                        pathname: '/(tabs)/home/search',
                        params: {
                            brand,
                            number,
                        }
                    })}
                    icon={'magnify'}
                />
            </HStack>
        </Flex>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginVertical: APP_MARGIN / 2,
        paddingBottom: APP_MARGIN,
        paddingTop: APP_MARGIN / 2,
        marginLeft: -APP_MARGIN,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})