import { RootState } from '@store/store.type';

const UserSelectors = {
    getUser: ({ user }: RootState) => {
        return user;
    },
    isAuth: ({ user }: RootState) => {
        return !!user;
    }

};

export default UserSelectors;
