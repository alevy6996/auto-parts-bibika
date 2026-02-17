import React, { useMemo, useState } from 'react';
import { HStack } from 'react-native-flex-layout';
import { useListQuickDetailQuery } from '@store/query/laximo/laximo.api';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Button, Dialog, Portal, Text, useTheme } from 'react-native-paper';
import {
    defaultListQuickDetailResponse,
    ListQuickDetailCategory,
    ListQuickDetailDetail,
    ListQuickDetailUnit
} from '@store/query/laximo/responses/list-quick-detail.response';
import { APP_MARGIN } from '@shared/consts/app.const';
import { MaterialActivityIndicator } from '@shared/components/material-activity-indicator';
import { FlashList } from '@shopify/flash-list';
import { QuickGroupDetailDialogContent } from '@components/catalogue/quick-group-detail-dialog-content';
import { QuickGroupDetailUnit } from '@components/catalogue/quick-group-detail-unit';

export default function QuickGroupDetail() {

    const { colors } = useTheme();

    const [currentDetail, setCurrentDetail] = useState({} as ListQuickDetailDetail);
    const [dialogVisible, setDialogVisible] = useState(false);

    const queryParams = useLocalSearchParams<{
        brand: string,
        quickGroupId: string,
        vehicleId: string,
        ssd: string,
        catalog: string,
    }>();
    const {
        data: { Category: categories } = defaultListQuickDetailResponse,
        isFetching,
        isLoading,
        refetch
    } = useListQuickDetailQuery(queryParams);

    const flatCategories = useMemo(() =>
        categories.flatMap(category => {
            const { Unit, ...rest } = category;
            const units = Unit.map(unit => {
                return {
                    type: 'unit',
                    ...unit
                } as ListQuickDetailUnit & { type: 'unit' }
            })
            return [
                {
                    type: 'category',
                    ...rest
                } as Omit<ListQuickDetailCategory, 'Unit'> & { type: 'category' },
                ...units
            ]
        }),
    [categories]);

    const stickyHeaderIndices = useMemo(() => {
        return flatCategories.flatMap((item, index) => {
            if (item.type === 'category') {
                return index;
            } else return [];
        })
    }, [flatCategories]);

    const showDialog = () => setDialogVisible(true);
    const hideDialog = () => setDialogVisible(false);
    const handlePress = (detail: ListQuickDetailDetail) => {
        setCurrentDetail(detail);
        showDialog()
    }

    if (isLoading) return <MaterialActivityIndicator/>
    return (
        <>
            <FlashList
                refreshing={isFetching}
                onRefresh={refetch}
                estimatedItemSize={380}
                data={flatCategories}
                renderItem={({ item }) => {
                    if (item.type === 'category') {
                        return (
                            <HStack style={[styles.listHeader]} bg={colors.background}>
                                <Text variant='titleLarge'>{item.name}</Text>
                            </HStack>
                        )
                    }

                    return (
                        <QuickGroupDetailUnit
                            unit={item}
                            brand={queryParams.brand}
                            handleInfoPress={handlePress}
                        />
                    )
                }}
                getItemType={(item) => item.type}
                stickyHeaderIndices={stickyHeaderIndices}
            />

            <Portal>
                <Dialog visible={dialogVisible} onDismiss={hideDialog}>
                    <Dialog.Title>Подробности</Dialog.Title>
                    <QuickGroupDetailDialogContent detail={currentDetail}/>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>OK</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>
    )
}

const styles = StyleSheet.create({
    cardContent: {
        minHeight: 72,
        // overflow: 'hidden',
        paddingHorizontal: APP_MARGIN,
    },
    listHeader: {
        paddingVertical: APP_MARGIN,
        paddingHorizontal: APP_MARGIN * 2,
        marginBottom: -APP_MARGIN,
        paddingBottom: APP_MARGIN / 2,
        flex: 1,
    },
})