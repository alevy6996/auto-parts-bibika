import { ItemModel } from '@shared/models/item.model';

export type SearchTipsResponse = SearchTip[]

export type SearchTip = ItemModel & {
    description: string;
}
