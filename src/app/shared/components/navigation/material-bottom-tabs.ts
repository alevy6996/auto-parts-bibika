import { MaterialBottomTabNavigationEventMap, MaterialBottomTabNavigationOptions } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { withLayoutContext } from 'expo-router';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';

const { Navigator } = createMaterialBottomTabNavigator();

export const MaterialBottomTabs = withLayoutContext<
    MaterialBottomTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialBottomTabNavigationEventMap
>(Navigator);
