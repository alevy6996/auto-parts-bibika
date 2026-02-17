import { withLayoutContext } from 'expo-router';
import { createStackNavigator, StackNavigationEventMap, StackNavigationOptions } from '@react-navigation/stack';
import { ParamListBase, StackNavigationState } from '@react-navigation/native';

const { Navigator } = createStackNavigator();

export const MaterialStack = withLayoutContext<
    StackNavigationOptions,
    typeof Navigator,
    StackNavigationState<ParamListBase>,
    StackNavigationEventMap
>(Navigator);
