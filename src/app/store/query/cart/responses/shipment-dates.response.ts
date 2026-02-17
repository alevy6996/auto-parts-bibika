export type ShipmentDatesResponse = ShipmentDate[];

export type ShipmentDate = {
    // Дата отгрузки в формате ГГГГ-ММ-ДД
    date: string,
    // Дата отгрузки и день недели для отображения
    name: string;
}
