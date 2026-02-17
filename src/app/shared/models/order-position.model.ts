import {CartPrepareItemModel} from './cart-prepare-item.model';

export type OrderPositionModel = CartPrepareItemModel & {
    quantity: number;
    comment: string;
}
