import { SearchArticle } from '@store/query/search/responses/articles.response';
import { CartAddPosition } from '@store/query/cart/cart-add-response';
import { ItemModel } from '@shared/models/item.model';

export type CartContentMeta = ItemModel & {
    positionId: number;
    images: string[],
    availability: number,
    quantity: number,
    checked: boolean,
    deadline: number,
    deadlineMax: number,
    price: number,
    packing: number,
}

export function cartContentFromSearchArticleCartAddResult(articleItem: SearchArticle, cartResult: CartAddPosition, images: string[]) {
    const cartItem: CartContentMeta = {
        availability: articleItem.availability,
        brand: cartResult.brand,
        checked: true,
        images,
        number: cartResult.number,
        positionId: cartResult.cartPositionId,
        quantity: cartResult.quantity,
        deadline: cartResult.deadline,
        deadlineMax: cartResult.deadlineMax,
        price: articleItem.price,
        packing: articleItem.packing
    }

    return cartItem;
}