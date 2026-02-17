import { Card } from 'react-native-paper';
import { APP_MARGIN } from '@shared/consts/app.const';
import { Flex } from 'react-native-flex-layout';
import { FlashList } from '@shopify/flash-list';
import { QuickGroupDetailCategoryDetail } from '@components/catalogue/quick-group-detail-category-detail';
import React, { useMemo } from 'react';
import { ListQuickDetailDetail, ListQuickDetailUnit } from '@store/query/laximo/responses/list-quick-detail.response';
import { StyleSheet } from 'react-native';

interface QuickGroupDetailUnitProps {
    unit: ListQuickDetailUnit;
    handleInfoPress: (detail: ListQuickDetailDetail) => void;
    brand: string;
}

const CARD_ITEM_HEIGHT = 120;

export const QuickGroupDetailUnit = ({ unit, handleInfoPress, brand }: QuickGroupDetailUnitProps) => {
    const details = unit.Detail;
    if (!details) return null;

    let cardHeight = details.length * CARD_ITEM_HEIGHT;
    if(cardHeight > CARD_ITEM_HEIGHT * 4) cardHeight = CARD_ITEM_HEIGHT * 4;

    const imageUrl = useMemo(() => {
        const index = unit.imageurl.indexOf('%size%');
        return unit.imageurl.slice(0, index) + 'source' + unit.imageurl.slice(index + 6);
    }, [unit]);

    return (
        <Card style={{ margin: APP_MARGIN }}>
            <Card.Title title={unit.name} titleNumberOfLines={2}/>
            <Card.Cover source={{ uri: imageUrl }} resizeMode='contain'/>
            <Flex style={[styles.cardContent, { height: cardHeight }]}>
                <FlashList
                    nestedScrollEnabled
                    fadingEdgeLength={200}
                    estimatedItemSize={CARD_ITEM_HEIGHT}
                    data={details}
                    renderItem={({ item: detail }) =>
                        <QuickGroupDetailCategoryDetail
                            onInfoPress={() => handleInfoPress(detail)}
                            detail={detail}
                            brand={brand}
                            number={detail.oem ?? ''}
                        />
                    }
                />
            </Flex>
        </Card>
    )
}

const styles = StyleSheet.create({
    cardContent: {
        minHeight: 72,
        // overflow: 'hidden',
        paddingHorizontal: APP_MARGIN,
    },
})