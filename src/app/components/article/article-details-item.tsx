import { Card, CardProps, Text } from 'react-native-paper';
import { QuantitySegmentedButtons } from '@shared/components/inputs/quantity-segmented-buttons';
import React, { useMemo } from 'react';
import { SearchArticle } from '@store/query/search/responses/articles.response';
import { formatDeadline } from '@shared/features/format-deadline';

interface ArticleDetailProps {
    item: SearchArticle;
    handleAddToCart: (item: SearchArticle, quantity: number) => void;
    cardStyle?: CardProps['style']
}

export const ArticleDetailsItem = ({ item, handleAddToCart, cardStyle }: ArticleDetailProps) => {

    const formattedDate = useMemo(() => {
        return formatDeadline(item.deliveryPeriod, item.deliveryPeriodMax)
    }, []);

    return (
        <Card style={cardStyle}>
            <Card.Content>
                <Text variant={'headlineSmall'}>{item.price} руб.</Text>
                <Text>{formattedDate}</Text>
            </Card.Content>
            <Card.Actions>
                <QuantitySegmentedButtons
                    maxQuantity={item.availability}
                    onSubmit={(quantity) => {
                        void handleAddToCart(item, quantity);
                    }}
                    quantityMultiplier={item.packing || 1}
                />
            </Card.Actions>
        </Card>
    )
}