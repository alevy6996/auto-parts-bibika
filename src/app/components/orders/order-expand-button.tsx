import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Pressable } from 'react-native';
import { HStack } from 'react-native-flex-layout';
import { APP_MARGIN } from '@shared/consts/app.const';
import React from 'react';
import { createAnimatedComponent } from 'react-native-reanimated/src/createAnimatedComponent';
import { IconButton, Text } from 'react-native-paper';

const AnimatedIconButton = createAnimatedComponent(IconButton);

interface OrderExpandButtonProps {
    visible: boolean,
    hide: () => void,
    show: () => void,
}
export const OrderExpandButton = ({ visible, hide, show }: OrderExpandButtonProps) => {

    const opacity = useSharedValue(1);
    const rotation = useSharedValue(0);

    const blink = () => {
        opacity.value = 0;
        opacity.value = withTiming(1, { duration: 300 });
    }
    const iconStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: withTiming(`${rotation.value}deg`, { duration: 300 }) }]
    }))

    const hideButton = () => {
        rotation.value = 0;
        blink();
        hide();
    }
    const showButton = () => {
        rotation.value = 180;
        blink();
        show();
    }

    return (
        <Pressable
            onPress={visible ? hideButton : showButton}
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
            }}
        >
            <HStack items='center' justify='between' w={90}>
                <Animated.View style={{ opacity }}>
                    <Text>{visible ? 'Меньше' : 'Подробнее'}</Text>
                </Animated.View>
                <AnimatedIconButton
                    icon={'arrow-down'}
                    size={APP_MARGIN * 2}
                    style={[{
                        height: APP_MARGIN * 4,
                        width: APP_MARGIN * 2
                    }, iconStyle]}
                />
            </HStack>
        </Pressable>
    )
}