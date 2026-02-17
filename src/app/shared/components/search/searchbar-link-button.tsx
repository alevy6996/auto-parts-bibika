import {Searchbar} from 'react-native-paper';
import React from 'react';
import {Link} from 'expo-router';
import {Pressable} from 'react-native';

type SearchbarButtonProps = {
    onPress?: () => void;
    placeholder?: string;
    href: any
}

export const SearchbarLinkButton = ({placeholder = 'Поиск', href}: SearchbarButtonProps) => {

    return (
        <Link href={href} asChild>
            <Pressable style={{width: '100%'}}>
                <Searchbar editable={false} value='' placeholder={placeholder}/>
            </Pressable>
        </Link>
    );
};
