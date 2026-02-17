import { PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '@store/user/user-state.model';

/**
 * ### Actions example
 * ###### 1. action with prepare and reducer:
 * ```typescript
 * someAction: {
 *         reducer: (state: State, action: PayloadAction<...>) => {
 *             // modify state
 *         },
 *         prepare: (someInfo) => {
 *             return {payload: someInfo + ':)'};
 *         },
 *     },
 * ```
 * ###### 2. simple action:
 * ```typescript
 * someAction: (state: State, action: PayloadAction<...>) => {
 *         // modify state
 *     }
 * ```
 */
const userActions = {
    setName: (state: UserState, { payload }: PayloadAction<string>) => {
        if (state)
            state.name = payload;
    },
    setUser: (state: UserState, { payload }: PayloadAction<UserState>) => {
        return payload;
    }
};

export default userActions;
