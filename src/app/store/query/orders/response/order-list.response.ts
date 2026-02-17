import {OrderResponse} from '@store/query/orders/response/order.response';
import {OrderNote} from '@store/query/orders/response/order-notes.response';
import {OrderPositionResponse} from '@store/query/orders/response/order-position.response';

export type OrderListResponse = OrderListItem[];

export type OrderListItem = Omit<OrderResponse, 'wholeOrderOnly' | 'positions'> & {
    // Идентификатор адреса доставки
    deliveryAddressId: number;
    // Адрес доставки
    deliveryAddress: string;
    // Идентификатор офиса самовывоза
    deliveryOfficeId: number;
    // Офис самовывоза
    deliveryOffice: string;
    // Идентификатор типа доставки
    deliveryTypeId: number;
    // Тип доставки
    deliveryType: string;
    // Идентификатор типа оплаты
    paymentTypeId: number;
    // Тип оплаты
    paymentType: string;
    // Стоимость доставки
    deliveryCost: number;
    // Дата отгрузки
    shipmentDate: string;
    // Список заметок заказа
    notes: OrderNote[]
    // Список позиций заказа
    positions: OrderListPosition[];
}

export type OrderListPosition = Omit<OrderPositionResponse, 'positionId'> & {
    // Заказываемое количество
    quantityOrdered: number;
    priceRate: number;
    priceInSiteCurrency: number;
    // Ответ сотрудника на комментарий по позиции
    commentAnswer: string;
}
