import {createSlice} from '@reduxjs/toolkit';
import {initialInitState} from '@store/init/init.const';
import initActions from '@store/init/init.actions';

const initStore = createSlice({
    name: 'init',
    initialState: initialInitState,
    reducers: initActions
});
export const InitActions = initStore.actions;
export default initStore.reducer;
