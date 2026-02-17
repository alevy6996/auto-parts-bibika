import {ItemModel} from '@shared/models/item.model';

export type SearchHistoryResponse = SearchHistory[];

export type SearchHistory = ItemModel & {
    numberFix: string,
    description: string,
    datetime: string
}
