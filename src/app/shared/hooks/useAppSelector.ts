import {useSelector} from 'react-redux';
import {RootState} from '@store/store.type';

export const useAppSelector = useSelector.withTypes<RootState>();
