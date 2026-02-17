import { useColorScheme } from 'react-native';
import { MD3Theme } from 'react-native-paper/lib/typescript/types';
import { Theme } from '@react-navigation/native';
import { darkNavTheme, darkTheme, lightNavTheme, lightTheme } from '@style/theme';

export default function useAppTheme() {
    const colorScheme = useColorScheme();
    type AppThemes = [MD3Theme, Theme];
    let result: AppThemes;

    if (colorScheme == 'dark') {
        result = [darkTheme, darkNavTheme];
    } else {
        result = [lightTheme, lightNavTheme];
    }

    return result;
}
