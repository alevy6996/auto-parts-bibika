import { ListQuickDetailDetail } from '@store/query/laximo/responses/list-quick-detail.response';
import { Dialog, Text } from 'react-native-paper';
import React from 'react';
import { ScrollView } from 'react-native';

export const QuickGroupDetailDialogContent = ({ detail }: { detail: ListQuickDetailDetail }) => {
    return (
        <Dialog.ScrollArea>
            <ScrollView>
                {Object.entries(detail).map(([key, value]) => {
                    if(key !== 'ssd' && key !== 'amount' && key!== 'name'&& key!== 'oem' && key !== 'codeonimage' && key !== 'match')
                        return (
                            <Text key={key}><Text variant='titleMedium'>{key}</Text>: {value}</Text>
                        )
                })}
            </ScrollView>
        </Dialog.ScrollArea>
    )
}