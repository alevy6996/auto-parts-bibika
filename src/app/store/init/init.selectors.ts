import { RootState } from '@store/store.type';

const initSelectors = {
    getInitSelector: ({ init }: RootState) => {
        return init;
    }
};

export default initSelectors;
