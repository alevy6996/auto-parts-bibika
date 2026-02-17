import {createMaterialTopTabNavigator, MaterialTopTabNavigationOptions} from '@react-navigation/material-top-tabs';
import {withLayoutContext} from 'expo-router';

const {Navigator} = createMaterialTopTabNavigator();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const MaterialTopTabs = withLayoutContext<MaterialTopTabNavigationOptions, typeof Navigator>(Navigator);
