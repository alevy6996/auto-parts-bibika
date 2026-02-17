import { createSlice } from '@reduxjs/toolkit';
import tabBarActions from '@store/tab-bar/tab-bar.actions';
import { initialTabBarState } from '@store/tab-bar/tab-bar.const';

const tabBarSlice = createSlice({
    name: 'tab-bar',
    initialState: initialTabBarState,
    reducers: tabBarActions,
});

export const TabBarActions = tabBarSlice.actions;
export default tabBarSlice.reducer;