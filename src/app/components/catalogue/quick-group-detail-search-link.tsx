import { ListQuickDetailDetail } from '@store/query/laximo/responses/list-quick-detail.response';
import { Text, useTheme } from 'react-native-paper';
import { Spacer, VStack } from 'react-native-flex-layout';
import { APP_MARGIN } from '@shared/consts/app.const';
import React from 'react';

interface SearchDetailLinkProps {
    detail: ListQuickDetailDetail;

}
export const SearchDetailLink = ({ detail }: SearchDetailLinkProps) => {
    const { colors } = useTheme()

    return (
        <VStack
            fill
            justify='between'
        >
            <VStack spacing={APP_MARGIN / 2}>
                <Text numberOfLines={2} variant='titleMedium' >{detail.name}</Text>
                <Text variant='titleSmall' >
                    OEM:
                    <Text variant='titleSmall' style={{ color: colors.primary }}>
                        {' ' + detail.oem}
                    </Text>
                </Text>
            </VStack>
            <Spacer h={APP_MARGIN}/>
            <Text>Количество: {detail.amount || 'X'} шт.</Text>
        </VStack>
    )
}