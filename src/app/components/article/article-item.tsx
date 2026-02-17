import { Card, CardProps, Text, useTheme } from 'react-native-paper';
import React, { useMemo } from 'react';
import { FormattedArticle } from '@shared/types/formatted-article.response';
import { Dimensions } from 'react-native';
import { ArticleCardCover } from '@components/article/article-card-cover';
import { AppConstants } from '@shared/consts';
import { Flex, VStack } from 'react-native-flex-layout';
import { APP_MARGIN } from '@shared/consts/app.const';

interface ArticleItemProps {
    article: FormattedArticle;
    onPress?: (() => void) | void;
    containerStyle?: CardProps['style'];
}

const MARGIN = AppConstants.APP_MARGIN;
const SCREEN_WIDTH = Dimensions.get('screen').width;

export const ArticleItem = (
    {
        article,
        onPress = () => {},
        numColumns = 1,
        containerStyle
    }: ArticleItemProps & { numColumns?: number }) => {
    
    const { colors } = useTheme();
    
    const images = useMemo(() => {
        return article.images.length ? article.images.map((image) => image.name) : [AppConstants.articleImagePlaceholderName]
    },[article]);
    const CAROUSEL_WIDTH = useMemo(() => SCREEN_WIDTH / numColumns - 2 * MARGIN, [numColumns]);
    const CAROUSEL_HEIGHT = useMemo(() => numColumns === 1 ? 200 : 100, [numColumns]);
    const CARD_HEIGHT = useMemo(() => numColumns === 1 ? 370 : 270, [numColumns]);

    return (
        <Card
            style={[
                {
                    marginVertical: MARGIN,
                    marginHorizontal: MARGIN,
                    height: CARD_HEIGHT,
                },
                containerStyle
            ]}
            onPress={onPress}
        >
            <ArticleCardCover
                images={images}
                width={CAROUSEL_WIDTH}
                height={CAROUSEL_HEIGHT}
            />
            <Card.Title title={article.brand} subtitle={article.numberFix}/>
            <VStack ph={APP_MARGIN * 2}>
                <Text
                    numberOfLines={2}
                    style={{
                        height: APP_MARGIN * 5,
                        color: colors.outline
                    }}
                >{article.description}</Text>
                <Flex
                    mt={APP_MARGIN}
                    bg={colors.primaryContainer}
                    h={APP_MARGIN * 5}
                    radius={APP_MARGIN}
                    center
                >
                    <Text variant='labelMedium'>От {article.cheapest.price} руб.</Text>
                </Flex>
            </VStack>
        </Card>
    )
}