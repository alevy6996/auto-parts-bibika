import 'react-native-gesture-handler';
import 'expo-dev-client';

import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

import store from './store/app.store';
import useAppTheme from '@shared/hooks/useAppTheme';
import InitApp from '@init';
import Toast from 'react-native-toast-message';
import { ToastService } from '@services/toast.service';
import AppNav from '@components/app-navigation';
import { toastConfig } from '@shared/config/material-toast-config';
import { PersistData } from '@shared/features/persist-data';

export default function AppLayout() {
    const [appTheme, navTheme] = useAppTheme();

    ToastService.theme = appTheme;

    useEffect(() => {
        void InitApp();
        console.log('Main Layout did mount!');
        return () => {
            void PersistData();
            console.log('Main Layout did unmount!');
        };
    }, []);

    return (
        <>
            <Provider store={store}>
                <PaperProvider theme={appTheme}>
                    <SafeAreaProvider>
                        <ThemeProvider value={navTheme}>
                            <AppNav />
                        </ThemeProvider>
                    </SafeAreaProvider>
                </PaperProvider>
            </Provider>
            <Toast config={toastConfig(appTheme)}/>
        </>

    );
}


