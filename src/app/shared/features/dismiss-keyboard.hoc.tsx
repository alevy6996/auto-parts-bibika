import React from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const DismissKeyboardHOC = (Component) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    // eslint-disable-next-line react/prop-types,react/display-name
    return ({ children, ...props }) => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <Component {...props}>
                {children}
            </Component>
        </TouchableWithoutFeedback>
    );
};