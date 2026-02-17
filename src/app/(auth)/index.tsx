import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HStack } from 'react-native-flex-layout';
import LoginForm from '@components/login/login-form.component';
import { Button, Card, Text } from 'react-native-paper';
import { Link } from 'expo-router';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import { APP_MARGIN, logoImage } from '@shared/consts/app.const';
import Animated, {
    interpolate,
    KeyboardState,
    useAnimatedKeyboard,
    useAnimatedReaction,
    useDerivedValue,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';

const COVER_HEIGHT = 300;

export default function LoginComponent() {
    const [isLoading, setIsLoading] = useState(false);
    const { state } = useAnimatedKeyboard()

    const coverHeight = useSharedValue(COVER_HEIGHT);
    const bottomHeight = useDerivedValue(
        () => interpolate(coverHeight.value, [0, COVER_HEIGHT], [COVER_HEIGHT / 1.5, 0]));

    useAnimatedReaction(() => state, (value) => {
        switch (value.value) {
            case (KeyboardState.OPENING || KeyboardState.OPEN):
                coverHeight.value = withTiming(0, { duration: 150 });
                break;
            case (KeyboardState.CLOSING || KeyboardState.CLOSED):
                coverHeight.value = withTiming(COVER_HEIGHT, { duration: 150 });
                break;
        }
    })

    return (
        <>
            <Animated.View style={{ height: coverHeight, overflow: 'hidden', marginBottom: -COVER_HEIGHT / 4 }}>
                <Card.Cover
                    style={{
                        width: '90%',
                        height: COVER_HEIGHT,
                        alignSelf: 'center',
                        backgroundColor: 'white',
                    }}
                    source={logoImage}
                    resizeMode={'contain'}
                />
            </Animated.View>

            <LoginForm onLoading={(value) => setIsLoading(value)}/>

            <HideWithKeyboard>
                <HStack position={'absolute'} bottom={30} w='100%' items={'center'} justify={'evenly'}>
                    <Text>Ещё не зарегистрированы?</Text>
                    <Link href={'/register'}>
                        <Button disabled={isLoading} mode='outlined'>Регистрация</Button>
                    </Link>
                </HStack>
            </HideWithKeyboard>

            <Animated.View style={{ height: bottomHeight }} />
            <SafeAreaView/>
        </>

    );
}
