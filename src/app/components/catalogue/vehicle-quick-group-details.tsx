import { ListQuickGroupResponse } from '@store/query/laximo/responses/list-quick-group.response';
import { Divider, List } from 'react-native-paper';
import { LayoutAnimation } from 'react-native';
import { VStack } from 'react-native-flex-layout';
import { APP_MARGIN } from '@shared/consts/app.const';
import React from 'react';
import { Link, useLocalSearchParams } from 'expo-router';

interface VehicleQuickGroupDetailsListItemProps {
    item: ListQuickGroupResponse,
}
export const VehicleQuickGroupDetailsListItem = ({ item }: VehicleQuickGroupDetailsListItemProps) => {
    const queryParams = useLocalSearchParams();
    let itemRow = null;

    if(item.row) {
        itemRow = [item.row].flat()
    }

    return (
        <List.Accordion
            title={item.name}
            left={(props => <List.Icon {...props} icon='currency-eth'/>)}
            onPress={() => LayoutAnimation.easeInEaseOut()}
        >
            {itemRow && itemRow.map((value) =>
                <VStack key={value.quickgroupid} ml={-2 * APP_MARGIN}>
                    {
                        value.row ?
                            <VehicleQuickGroupDetailsListItem item={value} /> :
                            <Link
                                href={{ 
                                    pathname: '/(tabs)/catalogue/quick-group-detail',
                                    params: {
                                        ...queryParams,
                                        title: value.name,
                                        quickGroupId: value.quickgroupid,
                                    }
                                }}
                                asChild
                            >
                                <List.Item title={value.name}/>
                            </Link>
                    }
                    <Divider horizontalInset/>
                </VStack>
            )}
        </List.Accordion>
    )
}