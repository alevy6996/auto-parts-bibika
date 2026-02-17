import React from 'react';
import { AnimatedSearchBase } from '@shared/components/search/animated-search-base';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useSearchHistoryQuery, useSearchTipsQuery } from '@store/query/search/search.api';
import { Surface } from 'react-native-paper';
import { SearchList } from '@components/search/search-tips-list';

interface AnimatedSearchProps {
    onFocus?: () => void;
    onBlur?: () => void;
    placeholder?: string;
}

export const AnimatedSearch = (
    {
        onFocus = () => {},
        onBlur = () => {},
        placeholder = 'Поиск по артикулу',
    }: AnimatedSearchProps
) => {
    const [value, setValue] = useState('');

    const [debouncedValue] = useDebounce(value, 100);

    const {
        data: tipsData = [],
        isFetching: isTipsFetching,
        isLoading: isTipsLoading
    } = useSearchTipsQuery(debouncedValue);
    const {
        data: historyData = [],
        isFetching: isHistoryFetching,
        isLoading: isHistoryLoading,
    } = useSearchHistoryQuery(undefined, { pollingInterval: 30_000, skipPollingIfUnfocused: true });

    const isLoading = isTipsFetching || isHistoryFetching || isTipsLoading || isHistoryLoading;
    const data = value ? tipsData : historyData;
    const baseUrl = '/(tabs)/home/search';

    return (
        <AnimatedSearchBase
            loading={isLoading}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={placeholder}
            value={value}
            setValue={setValue}
        >
            <Surface mode='flat' elevation={3} style={{ paddingHorizontal: 8, flex: 1 }}>
                <SearchList
                    data={data}
                    searchUrl={baseUrl}
                    isTip={!!value}
                />
            </Surface>
        </AnimatedSearchBase>
    );
};
