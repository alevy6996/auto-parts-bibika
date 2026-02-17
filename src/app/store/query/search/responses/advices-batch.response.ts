import {ItemModel} from '@shared/models/item.model';

export type AdvicesBatchResponse = ItemModel | { advices: ItemModel[] }
