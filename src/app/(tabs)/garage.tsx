import React, { useRef, useState } from 'react';
import { useGarageListQuery } from '@store/query/garage/garage.api';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialActivityIndicator } from '@shared/components/material-activity-indicator';
import { CarCard } from '@components/garage/car-card';
import { FAB } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { APP_MARGIN } from '@shared/consts/app.const';
import { MaterialBottomSheetView } from '@shared/components/bottom-sheet/material-bottom-sheet-view';
import BottomSheet from '@gorhom/bottom-sheet';
import { AddCarForm } from '@components/garage/add-car-form';

export default function GarageComponent() {

    const [needForm, setNeedForm] = useState(false);

    const { data = [], isFetching, isLoading, refetch } = useGarageListQuery();

    const bottomSheetRef = useRef<BottomSheet>(null);

    if (isLoading) return <MaterialActivityIndicator/>

    return (
        <>
            <SafeAreaView/>
            <FlashList
                estimatedItemSize={130}
                refreshing={isFetching}
                onRefresh={refetch}
                data={data}
                renderItem={({ item: car }) => <CarCard car={car}/>}
            />
            <FAB
                icon={'plus'}
                style={styles.fab}
                onPress={() => {
                    setNeedForm(true);
                    bottomSheetRef.current?.snapToIndex(0);
                }}
            />
            <MaterialBottomSheetView
                bottomSheetRef={bottomSheetRef}
                snapPoints={['100%']}
            >
                {needForm && <AddCarForm/>}
            </MaterialBottomSheetView>
        </>
    );
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        margin: APP_MARGIN * 2
    }
})