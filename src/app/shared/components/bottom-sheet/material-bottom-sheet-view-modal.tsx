import { BottomSheetModal, BottomSheetModalProps, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { RefObject } from 'react';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { BottomSheetViewProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetView/types';

export const MaterialBottomSheetViewModal = (
    {
        bottomSheetRef,
        children,
        snapPoints = [400, '90%'],
        index = -1
    } : Omit<BottomSheetModalProps, 'children'> & {
        bottomSheetRef: RefObject<BottomSheetModalMethods>,
        children: BottomSheetViewProps['children']
    }
) => {
    return (
        <BottomSheetModal
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            index={index}
        >
            <BottomSheetView style={{ marginTop: 32, flex: 1 }}>
                {children}
            </BottomSheetView>
        </BottomSheetModal>
    )
}