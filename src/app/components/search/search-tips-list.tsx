import { FlashList } from '@shopify/flash-list';
import { HelperText } from 'react-native-paper';
import { SearchListItem } from '@shared/components/search/search-list-item';
import React from 'react';
import { SearchTip } from '@store/query/search/responses/tips.response';

interface SearchListProps {
    data: SearchTip[];
    searchUrl: string;
    isTip: boolean;
}

export const SearchList = ({
    data,
    searchUrl,
    isTip
}: SearchListProps) => {

    return (

        <FlashList 
            keyboardShouldPersistTaps='handled'
            data={data}
            ListEmptyComponent={<HelperText style={{ alignSelf: 'center' }} type='info'>Нет результатов</HelperText>}
            estimatedItemSize={80}
            contentContainerStyle={{
                paddingHorizontal: 10,
            }}
            renderItem={({ item: searchTip }) =>
                <SearchListItem
                    href={{
                        pathname: searchUrl,
                        params: {
                            brand: searchTip.brand,
                            number: searchTip.number
                        }
                    }}
                    item={searchTip}
                    isTip={isTip}
                />
            }
        />

    );
};
