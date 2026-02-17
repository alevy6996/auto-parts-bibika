import {CarResponse} from '@store/query/garage/car.response';

export type CarProp = Omit<CarResponse, 'id' | 'manufacturer' | 'model' | 'modification'>;
