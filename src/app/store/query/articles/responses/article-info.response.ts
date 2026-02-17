import {ItemModel} from '@shared/models/item.model';

export type ArticleInfoResponse = ArticleInfo[];

export type ArticleInfo = ItemModel & {
    /**
     * Номер детали, содержащий пробелы, слэши и другие символы.
     */
    outer_number: string;
    /**
     * ###### Сокращённый номер детали.
     * Нужен для идентификации в вашей поисковой выдаче одинаковых артикулов.
     *
     * Например, в случае двойной маркировки свечей NGK.
     */
    short_number: string;
    /**
     * ###### Альтернативный номер детали.
     * Нужен для идентификации в вашей поисковой выдаче одинаковых артикулов.
     *
     * Например, в случае коротких и полных номеров по бренду Mercedes (с буквой A и без)
     */
    alt_number: string;
    /**
     * Массив свойств детали: описание, вес, объем и т.п. (при включенном формате p)
     */
    properties: ArticleInfoProperties;
    /**
     * Массив информации об аналогах (при включенном формате c).
     * ###### Пример:
     * **`А - запрашиваемая деталь`**
     * - `crossType = 1` - замена (replacement), деталь B заменяет деталь A
     * - `crossType = 2` - входит в комплект (include), деталь B является частью детали A
     * - `crossType = 3` - является частью комплекта (part of), деталь A является частью детали B
     * - `crossType = 4` - односторонняя замена, деталь A заменяется на деталь B
     * - `crossType = 5` - односторонняя замена, деталь A является заменой для детали B
     */
    crosses: ArticleInfoCross[];
    /**
     * Массив изображений товара (при включенном формате i). В массиве указаны имена файлов расположенных по адресу http://pubimg.nodacdn.net/images/
     */
    images: ArticleInfoImage[];
}

export type ArticleInfoCross = ItemModel & {
    numberFix: string;
    crossType: 1 | 2 | 3 | 4 | 5;
    reliable: boolean;
    images: ArticleInfoImage[];
}
export type ArticleInfoImage = {
    name: string;
    order: number;
}
export type ArticleInfoProperties = {
    descr: string;
    ean: string;
    ext_descr: string;
    goods_group: string;
    height_mm: string;
    length_mm: string;
    volume: string;
    weight: string;
    width_mm: string;
}
