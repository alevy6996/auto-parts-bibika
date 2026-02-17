import React, { useCallback, useState } from 'react';
import DropDown, { DropDownPropsInterface } from 'react-native-paper-dropdown';

interface CartDropdownProps<T> {
    list: DropDownPropsInterface['list'],
    value: T,
    setValue: (value: T) => void
}
export const MaterialDropdown = <T extends string | number>({ list, value, setValue }: CartDropdownProps<T>) => {

    const [visible, setVisible] = useState(false);
    const hide = useCallback(() => setVisible(false), []);
    const show = useCallback(() => setVisible(true), []);

    return (
        <DropDown
            mode={'outlined'}
            visible={visible}
            onDismiss={hide}
            showDropDown={show}
            value={value}
            setValue={setValue}
            list={list}
        />
    )
}