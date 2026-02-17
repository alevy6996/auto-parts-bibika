import { CartPrepareItemModel } from '@shared/models/cart-prepare-item.model';

export type SearchArticlesResponse = SearchArticle[];

export type SearchArticle = CartPrepareItemModel & {
    // Дополнительная цена в валюте сайта
    additionalPrice: number;
    /* Наличие детали на складе,
    > ### -1,-2,-3 = +, ++, +++
    > ### -10 = 'Под заказ' */
    availability: number;
    // Замена срока поставки (используется вместо срока поставки, если не заполнен максимальный срок поставки)
    deadlineReplace: string;
    // Срок поставки (в часах)
    deliveryPeriod: number;
    // Максимальный срок поставки (в часах)
    deliveryPeriodMax: number;
    // Вероятность поставки товара поставщика
    deliveryProbability: number;
    // Описание детали
    description: string;
    // Идентификатор поставщика
    distributorId: number;
    // Время последнего обновления
    lastUpdateTime: string;
    // Флаг "Без возврата"
    noReturn: boolean;
    // "Очищенный" код детали
    numberFix: string;
    // Мин. Партия для заказа (кратность)
    packing: number;
    // Цена в валюте сайта
    price: number;
    // Цвет поставщика
    supplierColor?: string;
    // Описание поставщика
    supplierDescription: string;
    // Метаданные
    meta: {
        deadlineReplace: string;
        distributorCode: string;
        noReturn: string;
        supplierCode: string;
    };
}
