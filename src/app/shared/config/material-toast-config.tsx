import React from 'react';
import { BaseToastProps, ErrorToast, InfoToast, SuccessToast } from 'react-native-toast-message';
import { MD3Theme } from 'react-native-paper/lib/typescript/types';
import { StyleSheet } from 'react-native';

/*
  1. Create the config
*/
export const toastConfig = (theme: MD3Theme) => {

    const style = StyleSheet.create({
        contentContainerStyle: {
            backgroundColor: theme.colors.background,
        },
        text1Style: {
            color: theme.colors.onBackground
        },
        text2Style: {
            color: theme.colors.onBackground
        }
    })

    return {
        success: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
            <SuccessToast
                {...props}
                {...style}
            />
        ),
        error:
            (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
                <ErrorToast
                    {...props}
                    {...style}
                    style={{
                        borderLeftColor: theme.dark ? theme.colors.errorContainer : theme.colors.error,
                    }}
                    text2Style={{
                        color: theme.colors.error,
                    }}
                />
            ),
        info:
            (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
                <InfoToast
                    {...props}
                    {...style}
                />
            )

    }

}