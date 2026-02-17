import React from 'react';
import Animated, { SharedValue } from 'react-native-reanimated';
import { ArticleCardCover } from '@components/article/article-card-cover';
import { VStack } from 'react-native-flex-layout';
import { APP_MARGIN } from '@shared/consts/app.const';
import { Card, CardProps, Text } from 'react-native-paper';
import { ItemModel } from '@shared/models/item.model';

interface ArticleDetailsCoverProps {
    cardStyle: CardProps['style'],
    animatedHeight: SharedValue<number>,
    coverWidth: number,
    coverHeight: number,
    images: string[],
    descriptionColor: string,
    item: {
        brand: ItemModel['brand'],
        number: ItemModel['number'],
        description: string
    }
}

export const ArticleDetailsCover = (
    {
        coverWidth,
        cardStyle,
        coverHeight,
        descriptionColor,
        animatedHeight,
        item,
        images
    }: ArticleDetailsCoverProps
) => {
    return (
        <Card
            style={cardStyle}
        >
            <Animated.View
                style={{
                    height: animatedHeight,
                    overflow: 'hidden'
                }}
            >
                <ArticleCardCover width={coverWidth} height={coverHeight} images={images}/>
            </Animated.View>
            <VStack
                p={APP_MARGIN}
            >
                <Text>{item.brand + ' ' + item.number}</Text>
                <Text
                    style={{ color: descriptionColor }}
                >
                    {item.description}
                </Text>
            </VStack>
        </Card>
    )
}