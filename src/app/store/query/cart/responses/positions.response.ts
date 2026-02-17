import { CartPrepareItemModel } from '@shared/models/cart-prepare-item.model';
import { StatusResponse } from '@shared/responses/status.response';

export type Position = CartPrepareItemModel & StatusResponse & {
    quantity: number;
    numberFix: string;
}
