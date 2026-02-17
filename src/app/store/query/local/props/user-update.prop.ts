import { LoginAndPassword } from '@shared/types/login-and-password.type';

export type UserUpdateProp = LoginAndPassword & {
    //	Адрес электронной почты
    email?: string;
    //	Имя
    name?: string;
    //	Отчество
    secondName?: string;
    //	Фамилия
    surname?: string;
    //	Необязательный параметр. Предназначен для изменения пароля пользователя
    newPassword?: string;
    //	Дата рождения, формат YYYY-MM-DD
    birthDate?: string;
    //	Номер мобильного телефона
    mobile?: string;
    //Комментарий пользователя
    comment?: string;
};