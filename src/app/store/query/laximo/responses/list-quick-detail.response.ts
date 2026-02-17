export const defaultListQuickDetailResponse: ListQuickDetailResponse = {
    Category: [{
        Unit: [{
            Detail: [{
                name: '',
                codeonimage: '',
                amount: ''
            }],
            code: '',
            imageurl: '',
            largeimageurl: '',
            name: '',
            ssd: '',
            unitid: ''
        }],
        categoryid: '',
        name: '',
        ssd: ''
    }]
}

export interface ListQuickDetailResponse {
    // Категория
    Category: ListQuickDetailCategory[];
}

export interface ListQuickDetailCategory {
    // Узел
    Unit: ListQuickDetailUnit[];
    //
    categoryid: string;
    /**
   * Внутренний номер категории
   */
    name: string;
    /**
   * Наименование категории, по возможности, на запрашиваемом языке
   */
    ssd: string;
    /**
   * ID родительского элемента
   */
    parentcategoryid?: string;
    /**
   * Наличие вложенных категорий
   */
    childrens?: string;
    /**
   * Код категории
   */
    code?: string;
}

export interface ListQuickDetailUnit {
    // Деталь
    Detail: ListQuickDetailDetail[];
    /**
   * Код узла
   */
    code: string;
    /**
   * URL изображения, в котором присутствует переменная size
   * Переменная size может принимать следующие значения:
   *
   * Превью. Сжаты таким образом, чтобы высота и ширина не выходили за указанные размеры, но пропорции были сохранены:
   * - 150
   * - 175
   * - 200
   * - 225
   * - 250
   *
   * Оригинальный размер без изменений:
   * - source
   */
    imageurl: string;
    /**
   * URL изображения, в котором присутствует переменная size
   * Переменная size может принимать следующие значения:
   *
   * Превью. Сжаты таким образом, чтобы высота и ширина не выходили за указанные размеры, но пропорции были сохранены:
   * - 150
   * - 175
   * - 200
   * - 225
   * - 250
   *
   * Оригинальный размер без изменений:
   * - source
   */
    largeimageurl: string;
    /**
   * Наименование детали, по возможности, на запрошенном языке
   */
    name: string;
    /**
   *
   */
    ssd: string;
    /**
   * Внутренний номер категории
   */
    unitid: string;
    /**
   * Примечание к узлу (по возможности на запрашиваемом языке)
   */
    note?: string;
    /**
   * Код условия. Показывает, что узел может быть не применим к данному автомобилю и требуется уточнение параметров автомобиля.
   */
    filter?: string;
    /**
   * Флаги
   */
    flag?: string;
}

export interface ListQuickDetailDetail {
    // Наименование детали, по возможности на запрошенном языке
    name: string;
    // Код детали на иллюстрации для ListDetailByUnit.
    codeonimage: string;
    // Количество деталей
    amount: string;
    // OEM детали
    oem?: string;
    // Данные сервера
    ssd?: string;
    // Примечание к детали, по возможности на запрашиваемом языке
    note?: string;
    // Код условия. Показывает, что деталь может быть не применима к данному автомобилю и требуется уточнение параметров автомобиля.
    filter?: string;
    // Флаги
    flag?: string;
    // Используется в функции с параметром All и показывает, что данная деталь входит в искомую группу
    match?: string;
    //
    designation?: string;
    //
    applicablemodels?: string;
    //
    partspec?: string;
    // Код цвета
    color?: string;
    //
    shape?: string;
    //
    standard?: string;
    //
    material?: string;
    //
    size?: string;
    //
    featuredescription?: string;
    // Дата выпуска - с
    prodstart?: string;
    // Дата выпуска - по
    prodend?: string;
}
