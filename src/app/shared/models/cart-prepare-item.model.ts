import {ItemModel} from './item.model';

export type CartPrepareItemModel = ItemModel & {
    /* ###### Код позиции.
    Необходим для добавления товара в корзину.
    Обязателен для передачи заказа онлайн-поставщику
    ### Не является уникальным идентификатором!
     */
    itemKey: string;
    /* ### Код поставки.
    Необходим для добавления товара в корзину */
    supplierCode: number;
}
