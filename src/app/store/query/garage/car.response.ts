export type CarResponse = {
    // Идентификатор автомобиля в гараже
    id: string;
    // Название автомобиля (пользовательское)
    name: string;
    // Комментарий (пользовательский)
    comment: string;
    // Год выпуска автомобиля
    year: string;
    // VIN-код автомобиля
    vin: string;
    // Номер кузова автомобиля
    frame: string;
    // Пробег автомобиля
    mileage: string;
    // Идентификатор марки автомобиля
    manufacturerId: string;
    // Название марки автомобиля
    manufacturer: string;
    // Идентификатор модели автомобиля
    modelId: string;
    // Название модели автомобиля
    model: string;
    // Идентификатор модификации автомобиля
    modificationId: string;
    // Название модификации автомобиля
    modification: string;
    // Государственный номер автомобиля
    vehicleRegPlate: string;
}
