import {
    BottomSheetFlatList,
    BottomSheetProps,
} from '@gorhom/bottom-sheet';
import React, { RefObject } from 'react';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { BottomSheetFlatListProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/types';
import { MaterialBottomSheetBase } from '@shared/components/bottom-sheet/material-bottom-sheet-base';

export const MaterialBottomSheetFlatList = <T,>(
    {
        onClose = () => null,
        onChange,
        bottomSheetRef,
        snapPoints,
        onAnimate,
        index = -1,
        enablePanDownToClose,
        closeButton = true,
        translucentBackground = true,
        enableDynamicSizing,
        data,
        renderItem
    }: Omit<BottomSheetProps, 'children'> & BottomSheetFlatListProps<T> & {
        bottomSheetRef: RefObject<BottomSheetMethods>,
        closeButton?: boolean,
        translucentBackground?: boolean,
    }) => {

    return (
        <>
            <MaterialBottomSheetBase
                bottomSheetRef={bottomSheetRef}
                enableDynamicSizing={enableDynamicSizing}
                enablePanDownToClose={enablePanDownToClose}
                index={index}
                onClose={onClose}
                snapPoints={snapPoints}
                onAnimate={onAnimate}
                closeButton={closeButton}
                backdrop={translucentBackground}
                onChange={onChange}
            >
                <BottomSheetFlatList
                    style={{ marginTop: 32 }}
                    data={data}
                    renderItem={renderItem}
                />
            </MaterialBottomSheetBase>
        </>
    )
}