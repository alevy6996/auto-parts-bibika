import React, { useMemo, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useListQuickGroupQuery } from '@store/query/laximo/laximo.api';
import {
    defaultListQuickGroupResponse,
    ListQuickGroupResponse,
} from '@store/query/laximo/responses/list-quick-group.response';
import { ScrollView } from 'react-native';
import { MaterialActivityIndicator } from '@shared/components/material-activity-indicator';
import { VehicleQuickGroupDetailsListItem } from '@components/catalogue/vehicle-quick-group-details';
import { Searchbar } from 'react-native-paper';

const recourseFn = (item: ListQuickGroupResponse, searchText: string): ListQuickGroupResponse | [] => {
    function checkFilter() {
        const lowerSearch = searchText.toLowerCase();
        const lowerName = item.name.toLowerCase();
        const lowerSynonym = item.synonyms.toLowerCase();

        return lowerName.includes(lowerSearch) || lowerSynonym.includes(lowerSearch);
    }

    if(!item.row) {
        if(checkFilter())
            return item;
        else return [];
    }

    const itemRow = [item.row].flat();

    const filteredRow = itemRow.flatMap(rowItem => recourseFn(rowItem, searchText))
    if(!filteredRow.length) return [];
    return {
        ...item,
        row: filteredRow
    }
}

export default function QuickGroupList() {

    const [value, setValue] = useState('');
    const searchParams = useLocalSearchParams<{ vehicleId: string, catalog: string, ssd: string }>();


    const { data = defaultListQuickGroupResponse, isFetching } = useListQuickGroupQuery(searchParams);

    const filteredData = useMemo(() => data.row?.flatMap(item => recourseFn(item, value)) ?? [], [data, value]);

    if (isFetching) return <MaterialActivityIndicator/>
    return (
        <>
            <Searchbar
                inputStyle={{
                    minHeight: 0
                }}
                mode='view'
                value={value}
                onChangeText={setValue}
            />
            <ScrollView>
                {filteredData && filteredData.map(item =>
                    <VehicleQuickGroupDetailsListItem item={item} key={item.quickgroupid}/>
                )}
            </ScrollView>
        </>
    )
}
