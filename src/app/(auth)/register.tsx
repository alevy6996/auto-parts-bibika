import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RegisterForm from '@components/register/register-form.component';
import { FAB } from 'react-native-paper';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import { router } from 'expo-router';

export default function RegisterComponent() {

    return (
        <SafeAreaView style={style.flexContainer}>
            <View style={style.wrapper}>
                <RegisterForm/>
            </View>

            <View style={style.fab}>
                <HideWithKeyboard>
                    <FAB
                        icon='arrow-left'
                        onPress={router.back}
                    />
                </HideWithKeyboard>
            </View>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    flexContainer: {
        flex: 1,
    },
    wrapper: {
        justifyContent: 'center',
        marginHorizontal: 30
    },
    fab: {
        position: 'absolute',
        margin: 30,
        right: 0,
        bottom: 0,
    },
});
