import {ItemModel} from '@shared/models/item.model';

export type SearchBrandsObjectResponse = Record<string, SearchBrand>

export type SearchBrand = ItemModel & {
    availability: number;
    description: string;
    numberFix: string;
}

export function searchBrandsObjectToArray(response: SearchBrandsObjectResponse) {
    return Object.values(response);
}
