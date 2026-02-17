import { SysProperty } from './find-vehicle-by-vin.response';

export interface FindVehicleByPlateNumberResponse {
    /**
   * Атрибуты
   */
    attribute: FindVehicleByPlateNumberAttribute[];
    sysproperty: SysProperty;
    /**
   * Производитель
   */
    brand: string;
    /**
   * Наименование автомобиля, по возможности, на запрошенном языке
   */
    name: string;
    /**
   * Данные сервера
   */
    ssd: string;
    /**
   * Идентификатор автомобиля или модели автомобиля в рамках каталога.
   */
    vehicleid: string;
    /**
   * Код каталога, если поиск ведется по номеру без указания каталога
   */
    catalog?: string;
}

export interface FindVehicleByPlateNumberAttribute {
    /**
   * Примеры возможных атрибутов:
   *
   * | Параметр (`key`) |	Обязательный |	Описание |
   * | --- | --- | --- |
   * | model	| `-` |	Код модели автомобиля |
   * | grade |	`-` |	Комплектация автомобиля |
   * | transmission |	`-` |	Тип коробки передач |
   * | doors |	`-` |	Количество дверей |
   * | creationregion |	`-` |	Код региона производства |
   * | destinationregion |	`-` |	Код региона поставки |
   * | date |	`-` |	Дата производства автомобиля (ГГГГММ) |
   * | manufactured |	`-` |	Год производства автомобиля (ГГГГ) |
   * | framecolor |	`-` |	Код цвета кузова |
   * | trimcolor |	`-` |	Код цвета салона |
   * | datefrom |	`-` |	Период выпуска модификации |
   * | dateto |	`-` |	Период выпуска модификации |
   * | frame |	`-` |	Код кузова |
   * | frames |	`-` |	Перечисление кодов кузовов модели |
   * | framefrom |	`-` |	Диапазон кузовов |
   * | frameto |	`-` |	Диапазон кузовов |
   * | engine |	`-` |	Код двигателя |
   * | engine1 |	`-` |	Код двигателя |
   * | engine2 |	`-` |	Код двигателя |
   * | engineno |	`-` |	Диапазон номеров двигателя |
   * | options |	`-` |	Перечень опций, по возможности, на запрошенном языке |
   * | modelyearfrom |	`-` |	Года выпуска модели |
   * | modelyearto |	`-` |	Года выпуска модели |
   * | modification |	`-` |	Модификация |
   * | description |	`-` |	Описание |
   */
    key: string;
    name: string;
    value: string;
}
