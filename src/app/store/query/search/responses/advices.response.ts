import {ItemModel} from '@shared/models/item.model';

export type SearchAdvicesResponse = SearchAdvice[];

export type SearchAdvice = ItemModel & {
    total: string;
}
