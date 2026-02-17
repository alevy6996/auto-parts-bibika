import { Position } from './positions.response';

export type CartContentResponse = Position & {
    description: string;
    price: number;
    deadline: number;
    deadlineMax: number;
    comment: string;
    positionId: number;
    packing: number;
    distributorId: number;
}
