import { TabBarState } from '@store/tab-bar/tab-bar-state.model';
import { PayloadAction } from '@reduxjs/toolkit';

const tabBarActions = {
    showTabBar: (state: TabBarState, action: PayloadAction<void>) => {
        state.show = true;
    },
    hideTabBar: (state: TabBarState, action: PayloadAction<void>) => {
        state.show = false;
    }
}

export default tabBarActions;