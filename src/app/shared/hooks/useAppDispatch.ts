import {useDispatch} from 'react-redux';
import {AppDispatch} from '@store/store.type';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
