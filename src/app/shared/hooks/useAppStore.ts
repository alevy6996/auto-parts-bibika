import {useStore} from 'react-redux';
import {AppStore} from '@store/store.type';

export const useAppStore = useStore.withTypes<AppStore>();
