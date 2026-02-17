import { HStack } from 'react-native-flex-layout';
import { List, Text } from 'react-native-paper';
import React from 'react';
import { SearchTip } from '@store/query/search/responses/tips.response';
import { HrefObject } from 'expo-router/build/link/href';
import { useRouter } from 'expo-router';
import { Keyboard } from 'react-native';

interface SearchListItemProps {
    item: SearchTip,
    isTip: boolean,
    href: HrefObject
}

export const SearchListItem = ({ item, isTip, href }: SearchListItemProps) => {
    const router= useRouter();

    const navigate = () => {
        Keyboard.dismiss();
        router.navigate(href);
    };

    return (
        <List.Item
            onPress={navigate}
            style={{ paddingRight: 12 }}
            title={(props: { color: string, fontSize: number }) => {
                return (
                    <HStack
                        justify='between'
                        mr='10%'
                        childrenStyle={{
                            color: props.color,
                            fontSize: props.fontSize
                        }}
                    >
                        <Text>{item.brand}</Text>
                        <Text>{item.number}</Text>
                    </HStack>
                );
            }}
            description={item.description}
            left={props => <List.Icon {...props} style={{ alignSelf: 'center' }} icon={!isTip ? 'history' : 'magnify'}/>}
            right={props => <List.Icon {...props} style={{ alignSelf: 'center' }} icon={'arrow-right'}/>}
        />
    );
};
