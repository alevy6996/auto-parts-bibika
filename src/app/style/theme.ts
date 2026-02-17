import { MD3Theme } from 'react-native-paper/lib/typescript/types';
import { MD3DarkTheme as DefaultDarkTheme, MD3LightTheme as DefaultLightTheme } from 'react-native-paper';
import { Theme } from '@react-navigation/native';

// generated themes
const generatedLightTheme = {
    'colors': {
        'primary': 'rgb(92, 83, 167)',
        'onPrimary': 'rgb(255, 255, 255)',
        'primaryContainer': 'rgb(228, 223, 255)',
        'onPrimaryContainer': 'rgb(23, 3, 98)',
        'secondary': 'rgb(92, 83, 167)',
        'onSecondary': 'rgb(255, 255, 255)',
        'secondaryContainer': 'rgb(228, 223, 255)',
        'onSecondaryContainer': 'rgb(23, 3, 98)',
        'tertiary': 'rgb(148, 65, 112)',
        'onTertiary': 'rgb(255, 255, 255)',
        'tertiaryContainer': 'rgb(255, 216, 232)',
        'onTertiaryContainer': 'rgb(60, 0, 40)',
        'error': 'rgb(186, 26, 26)',
        'onError': 'rgb(255, 255, 255)',
        'errorContainer': 'rgb(255, 218, 213)',
        'onErrorContainer': 'rgb(65, 0, 2)',
        'background': 'rgb(255, 251, 255)',
        'onBackground': 'rgb(28, 27, 31)',
        'surface': 'rgb(255, 251, 255)',
        'onSurface': 'rgb(28, 27, 31)',
        'surfaceVariant': 'rgb(229, 225, 236)',
        'onSurfaceVariant': 'rgb(71, 70, 79)',
        'outline': 'rgb(120, 118, 128)',
        'outlineVariant': 'rgb(201, 197, 208)',
        'shadow': 'rgb(0, 0, 0)',
        'scrim': 'rgb(0, 0, 0)',
        'inverseSurface': 'rgb(49, 48, 52)',
        'inverseOnSurface': 'rgb(244, 239, 244)',
        'inversePrimary': 'rgb(199, 191, 255)',
        'elevation': {
            'level0': 'transparent',
            'level1': 'rgb(247, 243, 251)',
            'level2': 'rgb(242, 238, 248)',
            'level3': 'rgb(237, 233, 245)',
            'level4': 'rgb(235, 231, 244)',
            'level5': 'rgb(232, 228, 243)'
        },
        'surfaceDisabled': 'rgba(28, 27, 31, 0.12)',
        'onSurfaceDisabled': 'rgba(28, 27, 31, 0.38)',
        'backdrop': 'rgba(49, 47, 56, 0.4)'
    }
}
const generatedDarkTheme = {
    'colors': {
        'primary': 'rgb(199, 191, 255)',
        'onPrimary': 'rgb(45, 34, 118)',
        'primaryContainer': 'rgb(68, 58, 142)',
        'onPrimaryContainer': 'rgb(228, 223, 255)',
        'secondary': 'rgb(199, 191, 255)',
        'onSecondary': 'rgb(45, 34, 118)',
        'secondaryContainer': 'rgb(68, 58, 142)',
        'onSecondaryContainer': 'rgb(228, 223, 255)',
        'tertiary': 'rgb(255, 175, 214)',
        'onTertiary': 'rgb(91, 17, 64)',
        'tertiaryContainer': 'rgb(119, 41, 87)',
        'onTertiaryContainer': 'rgb(255, 216, 232)',
        'error': 'rgb(255, 180, 171)',
        'onError': 'rgb(105, 0, 4)',
        'errorContainer': 'rgb(147, 0, 9)',
        'onErrorContainer': 'rgb(255, 218, 213)',
        'background': 'rgb(28, 27, 31)',
        'onBackground': 'rgb(229, 225, 230)',
        'surface': 'rgb(28, 27, 31)',
        'onSurface': 'rgb(229, 225, 230)',
        'surfaceVariant': 'rgb(71, 70, 79)',
        'onSurfaceVariant': 'rgb(201, 197, 208)',
        'outline': 'rgb(146, 143, 153)',
        'outlineVariant': 'rgb(71, 70, 79)',
        'shadow': 'rgb(0, 0, 0)',
        'scrim': 'rgb(0, 0, 0)',
        'inverseSurface': 'rgb(229, 225, 230)',
        'inverseOnSurface': 'rgb(49, 48, 52)',
        'inversePrimary': 'rgb(92, 83, 167)',
        'elevation': {
            'level0': 'transparent',
            'level1': 'rgb(37, 35, 42)',
            'level2': 'rgb(42, 40, 49)',
            'level3': 'rgb(47, 45, 56)',
            'level4': 'rgb(49, 47, 58)',
            'level5': 'rgb(52, 50, 62)'
        },
        'surfaceDisabled': 'rgba(229, 225, 230, 0.12)',
        'onSurfaceDisabled': 'rgba(229, 225, 230, 0.38)',
        'backdrop': 'rgba(49, 47, 56, 0.4)'
    }
}

export const lightTheme: MD3Theme = {
    ...DefaultLightTheme,
    ...generatedLightTheme,
    colors: {
        ...DefaultLightTheme,
        ...generatedLightTheme.colors
    }
};
export const darkTheme: MD3Theme = {
    ...DefaultDarkTheme,
    ...generatedDarkTheme,
    colors: {
        ...DefaultDarkTheme,
        ...generatedDarkTheme.colors
    }
};

export const lightNavTheme: Theme = {
    dark: false,
    colors: {
        ...lightTheme.colors,
        card: lightTheme.colors.background,
        text: lightTheme.colors.primary,
        border: lightTheme.colors.onBackground,
        notification: lightTheme.colors.tertiary,
    }
};

export const darkNavTheme: Theme = {
    dark: true,
    colors: {
        ...darkTheme.colors,
        card: darkTheme.colors.onSecondary,
        text: darkTheme.colors.primary,
        border: darkTheme.colors.surfaceVariant,
        notification: darkTheme.colors.tertiary,
    }
};
