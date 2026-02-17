import { createSlice } from '@reduxjs/toolkit';
import { initialUserState } from '@store/user/user.const';
import userActions from '@store/user/user.actions';

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: userActions,
});

export const UserActions = userSlice.actions;
export default userSlice.reducer;
