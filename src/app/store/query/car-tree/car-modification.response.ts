import {CarModel} from '@store/query/car-tree/car-models.response';

export type CarModificationResponse = CarModification[];

export type CarModification = CarModel & {
    // Идентификатор модели
    modelId: number;
    // Название модели
    model: string;
    // Идентификатор марки
    manufacturerId: number;
    // Название марки
    manufacturer: string;
    // Полное название модификации, включающее марку и модель
    fullName: string;
    // Объем
    cylinderCapacityCcm: number;
    // Кузов
    constructionType: string;
    // Мощность в лошадиных силах
    powerHP: number;
    // Мощность в киловаттах
    powerKW: number;
    // Код двигателя
    motorCodes: string;
    // Тип топлива
    fuelType: string;
}
