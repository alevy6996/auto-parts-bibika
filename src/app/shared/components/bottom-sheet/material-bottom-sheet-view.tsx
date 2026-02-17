import { BottomSheetProps, BottomSheetView, } from '@gorhom/bottom-sheet';
import React, { RefObject } from 'react';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { BottomSheetViewProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetView/types';
import { MaterialBottomSheetBase } from '@shared/components/bottom-sheet/material-bottom-sheet-base';

export const MaterialBottomSheetView = (
    {
        children,
        backdrop = true,
        ...props
    }: Omit<BottomSheetProps, 'children'> & {
        bottomSheetRef: RefObject<BottomSheetMethods>,
        children: BottomSheetViewProps['children'],
        closeButton?: boolean,
        backdrop?: boolean,
        noMarginTop?: boolean,
        onSheetClose?: () => void
    }) => {

    return (
        <>
            <MaterialBottomSheetBase
                backdrop={backdrop}
                {...props}
            >
                <BottomSheetView style={{ flex: 1 }}>
                    {children}
                </BottomSheetView>
            </MaterialBottomSheetBase>
        </>
    )
}