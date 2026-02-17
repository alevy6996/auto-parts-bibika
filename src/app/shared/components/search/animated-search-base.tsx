import { Divider, Searchbar } from 'react-native-paper';
import React, { ReactNode, useState } from 'react';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Keyboard, View } from 'react-native';

import { AnimatedSurface } from '@shared/components/animated-surface';
import { AnimationConstants } from '@shared/consts';

interface AnimatedSearchBaseProps {
    onFocus?: () => void;
    onBlur?: () => void;
    placeholder?: string;
    value: string;
    setValue: (value: string) => void;
    children?: ReactNode,
    loading?: boolean
}

const listHeightConst = 300;

export function AnimatedSearchBase(
    {
        onFocus = () => {},
        onBlur = () => {},
        placeholder = 'Поиск по артикулу',
        value,
        setValue,
        children,
        loading = false
    }: AnimatedSearchBaseProps) {
    const [isActive, setIsActive] = useState(false);

    const listHeight = useSharedValue(0);
    const borderRadius = useSharedValue(30);

    const animatedSearchStyle = useAnimatedStyle(() => ({
        borderBottomLeftRadius: borderRadius.value,
        borderBottomRightRadius: borderRadius.value,
    }));
    const animatedListStyle = useAnimatedStyle(() => ({
        height: listHeight.value
    }));
    const animatedDividerStyle = useAnimatedStyle(() => ({
        height: interpolate(listHeight.value, [0, listHeightConst], [0, 2])
    }));

    const handleFocus = () => {
        setIsActive(true);
        borderRadius.value = withTiming(0, AnimationConstants.timingConfig,
            () => {
                listHeight.value = withTiming(listHeightConst, AnimationConstants.timingConfig);
            });
        onFocus();
    };

    const handleBlur = () => {
        setIsActive(false);
        listHeight.value = withTiming(0, AnimationConstants.timingConfig,
            () => {
                borderRadius.value = withTiming(30, AnimationConstants.timingConfig);
            });
        onBlur();
    };


    return (
        <>
            <AnimatedSurface
                elevation={3}
                mode='flat'
                style={[{
                    borderRadius: 30,
                    width: '100%',
                    overflow: 'hidden'
                },
                animatedSearchStyle]}
            >
                <Searchbar
                    loading={loading}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={value}
                    onChangeText={setValue}
                    placeholder={placeholder}
                    icon={isActive ? 'arrow-left' : undefined}
                    onIconPress={Keyboard.dismiss}
                />
                <Animated.View style={animatedDividerStyle}>
                    <Divider bold/>
                </Animated.View>
            </AnimatedSurface>

            <Animated.View
                style={[{
                    width: '100%',
                    overflow: 'hidden',
                    borderBottomRightRadius: 30,
                    borderBottomLeftRadius: 30
                }, animatedListStyle]}
            >
                <View style={{ minHeight: 5, width: '100%', height: '100%' }}>
                    {children}
                </View>
            </Animated.View>
        </>
    );
}
