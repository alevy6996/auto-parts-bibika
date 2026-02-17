import { RootState } from '@store/store.type';

const TabBarSelectors = {
    getVisibility: ({ tabBar }: RootState) => {
        return tabBar.show;
    }
}

export default TabBarSelectors;