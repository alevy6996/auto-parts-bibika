export interface OrderCartProp {
    // Идентификатор способа оплаты.
    paymentMethod: number;
    // Идентификатор способа доставки.
    shipmentMethod: number;
    // Идентификатор адреса доставки.
    shipmentAddress: number;
    // Идентификатор офиса самовывоза
    shipmentOffice: number;
    // Дата отгрузки. YYYY-mm-DD
    shipmentDate: string;
    // Комментарий к заказу.
    comment: string;
    // Признак - оформить заказ целиком. Принимаемые значения - 0/1. По умолчанию - 0.
    wholeOrderOnly?: 0 | 1;
    // Необязательный параметр - массив с номерами позиций заказа. Номера возвращает запрос basket/content
    positionIds?: number[];
}
