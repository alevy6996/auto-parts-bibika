export interface UserResponse {
    // Идентификатор пользователя в системе ABCP.
    id: number;
    // Код пользователя.
    code: number;
    // Адрес электронной почты пользователя.
    email: string;
    // ФИО или название организации
    name: string;
    // Мобильный телефон
    mobile: string;
    // Наименование юридического лица
    organization: string;
}
