import React from 'react';
import { Pagination } from 'react-native-reanimated-carousel';
import { SharedValue } from 'react-native-reanimated';
import { useTheme } from 'react-native-paper';
import { APP_MARGIN } from '@shared/consts/app.const';

interface MaterialCarouselDotsProps<T> {
    progress: SharedValue<number>;
    data: T[]
}

export const MaterialCarouselDots = <T extends any>({ progress, data }: MaterialCarouselDotsProps<T>) => {

    const { dark, colors } = useTheme();

    return (
        <Pagination.Basic
            size={APP_MARGIN}
            progress={progress}
            data={data}
            dotStyle={{
                borderRadius: 100,
                backgroundColor: colors.outline,
                opacity: 1
            }}
            activeDotStyle={{
                backgroundColor: dark ? colors.onPrimary : colors.primary,
                overflow: 'hidden',
            }}
            containerStyle={{
                position: 'absolute',
                gap: APP_MARGIN / 2,
                marginBottom: APP_MARGIN / 2,
                bottom: 0
            }}
        />
    )
}