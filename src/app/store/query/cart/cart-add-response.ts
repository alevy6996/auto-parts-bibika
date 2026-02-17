import { StatusResponse } from '@shared/responses/status.response';
import { CartPrepareItemModel } from '@shared/models/cart-prepare-item.model';

export type CartAddResponse = StatusResponse & {
    positions: CartAddPosition[]
}
export type CartAddPosition = Omit<CartPrepareItemModel, 'itemKey'> & StatusResponse & {
    supplierCode: string,
    quantity: number,
    comment: string,
    numberFix: string,
    deadline: number,
    deadlineMax: number,
    description: string,
    status: number,
    cartPositionId: number
}