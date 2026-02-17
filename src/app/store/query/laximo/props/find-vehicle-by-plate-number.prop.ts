export interface FindVehicleByPlateNumberProp {
    // Регистрационный номер
    plateNumber: string;
    // Язык, на котором предпочтительно получить данные
    locale?: string;
    // Код страны. Для РФ - ru
    countryCode?: string;
}
