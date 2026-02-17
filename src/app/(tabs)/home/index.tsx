import React from 'react';
import { VStack } from 'react-native-flex-layout';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { Card } from 'react-native-paper';

import { AnimatedSearch } from '@shared/components/search/animated-search';
import { DismissKeyboardHOC } from '@shared/features/dismiss-keyboard.hoc';
import { AnimationConstants } from '@shared/consts';
import { logoImage } from '@shared/consts/app.const';

const KeyboardDismissVStack = DismissKeyboardHOC(VStack);
const CAROUSEL_HEIGHT = 250;

export default function FirstHomeTab() {
    const carouselHeight = useSharedValue(CAROUSEL_HEIGHT);

    const handleFocus = () => {
        carouselHeight.value = withTiming(0, AnimationConstants.timingConfig);
    };
    const handleBlur = () => {
        carouselHeight.value = withTiming(CAROUSEL_HEIGHT, AnimationConstants.timingConfig);
    };

    return (
        <KeyboardDismissVStack fill items='center' spacing={16}>
            <SafeAreaView/>

            <Animated.View
                style={{
                    height: carouselHeight,
                    width: '100%',
                    justifyContent: 'center',
                    overflow: 'hidden'
                }}
            >
                <Card.Cover
                    style={{
                        width: '80%',
                        height: CAROUSEL_HEIGHT,
                        alignSelf: 'center',
                        backgroundColor: 'white'
                    }}
                    source={logoImage}
                    resizeMode={'contain'}
                />
            </Animated.View>

            <VStack ph={16} w='100%'>
                <AnimatedSearch onBlur={handleBlur} onFocus={handleFocus}/>
            </VStack>

        </KeyboardDismissVStack>
    );
}
