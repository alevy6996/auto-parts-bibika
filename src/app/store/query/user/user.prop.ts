import {UserConstants} from '../../../shared/consts';

export type UserProp = {
    /**
    Тип регистрации:
    1. Розница
    2. Опт
    */
    marketType: 1 | 2;
    /* Код филиала (если имеются) */
    filialId?: number;
    /* Имя */
    name: string;
    /* Отчество */
    secondName: string;
    /* Фамилия */
    surname: string;
    /* Пароль */
    password: string;
    /**
    * Дата рождения
    * ##### формат:
    * ### YYYY-MM-DD
    */
    birthDate?: string
    /* Номер мобильного телефона */
    mobile: string;
    /* Название автоклуба */
    memberOfClub?: string;
    /* Идентификатор офиса */
    office?: number;
    /* Адрес электронной почты */
    email?: string;
    /* ICQ UIN */
    icq?: string;
    /* Skype */
    skype?: string;
    /* Код региона */
    regionId?: number;
    /* Город */
    city: string;
    /* Наименование организации */
    organizationName?: string;
    /**
    Тип организации. Значение от 1 до 3:
    1. Автосервис
    2. Автомагазин
    3. Собственный автопарк
     */
    business?: 1 | 2 | 3;
    /**
    * Правовая форма организации. Варианты:
    * + ООО
    * + ОАО
    * + ЗАО
    * + ТОО
    * + АО
    * + ЧП
    * + ПБОЮЛ
    */
    organizationForm?: UserConstants.UserOrganisationFormType;
    /* Наименование по регистрации (без правовой формы юр. лица) */
    organizationOfficialName?: string;
    /* ИНН */
    inn?: string;
    /* КПП */
    kpp?: string;
    /* ОГРН */
    ogrn?: string;
    /* Юридический адрес организации */
    organizationOfficialAddress?: string;
    /* Наименование банка */
    bankName?: string;
    /* БИК банка */
    bik?: string;
    /* Корреспондентский счет банка */
    correspondentAccount?: string;
    /* Расчетный счет организации */
    organizationAccount?: string;
    /* Адрес доставки */
    deliveryAddress?: string;
    /* Комментарий */
    comment?: string;
    /**
    * Необязательный, по-умолчанию - 0.
    * + **1** - отправлять клиенту, менеджеру письмо о регистрации
    * + **0** - не отправлять письмо
    */
    sendRegistrationEmail?: 0 | 1;

}
