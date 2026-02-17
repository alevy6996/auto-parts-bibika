import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetHandle,
    BottomSheetProps
} from '@gorhom/bottom-sheet';
import { IconButton, useTheme } from 'react-native-paper';
import React, { RefObject, useCallback } from 'react';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { BottomSheetViewProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetView/types';
import { APP_MARGIN } from '@shared/consts/app.const';
import { Flex } from 'react-native-flex-layout';

export type MaterialBottomSheetBaseProps = Omit<BottomSheetProps, 'children'> & {
    bottomSheetRef: RefObject<BottomSheetMethods>,
    children: BottomSheetViewProps['children'],
    closeButton?: boolean,
    backdrop?: boolean;
    noMarginTop?: boolean,
    onSheetClose?: () => void
}

export const MaterialBottomSheetBase = (
    {
        bottomSheetRef,
        backdrop = true,
        children,
        index = -1,
        closeButton = true,
        noMarginTop = false,
        onSheetClose,
        onChange,
        ...props
    }: MaterialBottomSheetBaseProps
) => {

    const { colors } = useTheme();

    const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            {...props}
        />
    ), [])

    return (
        <>
            <BottomSheet
                index={index}
                backdropComponent={backdrop ? renderBackdrop : null}
                handleComponent={closeButton ? (props) => {
                    return (
                        <>
                            <BottomSheetHandle {...props} style={{ marginBottom: APP_MARGIN * 4 }}/>
                            <IconButton
                                style={{
                                    position: 'absolute',
                                    right: 0,
                                }}
                                icon='close'
                                onPress={() => bottomSheetRef.current?.close()}
                            />
                        </>
                    )
                } : undefined}
                backgroundStyle={{ backgroundColor: colors.background }}
                ref={bottomSheetRef}
                style={{
                    marginTop: !noMarginTop ? APP_MARGIN * 10 : undefined,
                }}

                onChange={index => {
                    onChange && onChange(index);
                    if(index === -1 && onSheetClose) {
                        onSheetClose();
                    }
                }}

                {...props}
            >
                <Flex fill mb={!noMarginTop ? APP_MARGIN * 10 : undefined}>
                    {children}
                </Flex>
            </BottomSheet>
        </>
    )
}