import React, { useMemo } from 'react';
import { FormattedArticle } from '@shared/types/formatted-article.response';
import { FlashList } from '@shopify/flash-list';
import { useCartAddItemsMutation } from '@store/query/cart/cart.api';
import { OrderPositionModel } from '@shared/models/order-position.model';
import { ToastService } from '@services/toast.service';
import { ResponseService } from '@services/response.service';
import { NetworkError } from '@shared/errors/network.error';
import { SearchArticle } from '@store/query/search/responses/articles.response';
import { ArticleDetailsItem } from '@components/article/article-details-item';
import { BottomSheetScrollView, SCREEN_WIDTH, useBottomSheet } from '@gorhom/bottom-sheet';
import { AppConstants } from '@shared/consts';
import { cartContentFromSearchArticleCartAddResult } from '@shared/types/cart-content-meta';
import { useAppDispatch } from '@shared/hooks';
import { CartActions } from '@store/cart/cart.store';
import { APP_MARGIN } from '@shared/consts/app.const';
import { Flex } from 'react-native-flex-layout';
import { useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { interpolate, useDerivedValue } from 'react-native-reanimated';
import { ArticleDetailsCover } from '@components/search/article-details-cover';

interface DetailsProps {
    item: FormattedArticle
}

const maxCoverHeight = 150;

export const ArticleDetails = ({ item }: DetailsProps) => {
    const { animatedIndex } = useBottomSheet();

    const coverHeight = useDerivedValue(() => {
        if (animatedIndex.value >= 0)
            return interpolate(animatedIndex.value, [0, 1], [maxCoverHeight, 0])
        else return maxCoverHeight;
    })

    const { roundness, colors } = useTheme();
    const dispatch = useAppDispatch();
    const [addToCart] = useCartAddItemsMutation();

    const CAROUSEL_WIDTH = useMemo(() => SCREEN_WIDTH - 2 * APP_MARGIN, []);
    const images = useMemo(() => {
        return item.images.length ? item.images.map((image) => image.name) : [AppConstants.articleImagePlaceholderName]
    }, [item]);

    const handleAddToCart = async (item: SearchArticle, quantity: number) => {
        try {
            const cartAddItem: OrderPositionModel = {
                ...item,
                quantity,
                comment: ''
            }
            const result = await addToCart([cartAddItem]).unwrap();

            if (result.errorMessage) ToastService.error(result.errorMessage);
            else {
                ToastService.success(`Позиция ${item.brand} ${item.number} (${quantity} шт.) добавлена в корзину`);

                const cartItem = cartContentFromSearchArticleCartAddResult(item, result.positions[0], images);
                dispatch(CartActions.addItem(cartItem));
            }
        } catch (e) {
            const errorMessage = ResponseService.getErrorMessage(e as NetworkError);
            ToastService.error(errorMessage);
        }
    }

    return (
        <>
            <ArticleDetailsCover
                cardStyle={styles.headerCard}
                animatedHeight={coverHeight}
                coverWidth={CAROUSEL_WIDTH}
                coverHeight={maxCoverHeight}
                images={images}
                descriptionColor={colors.outline}
                item={item}
            />
            <Flex
                radius={roundness * 3}
                style={styles.listWrapper}
            >
                <FlashList
                    estimatedItemSize={300}
                    data={item.articles}
                    renderItem={({ item }) =>
                        <ArticleDetailsItem
                            item={item}
                            handleAddToCart={handleAddToCart}
                            cardStyle={{
                                marginBottom: APP_MARGIN
                            }}
                        />}
                    keyExtractor={item => item.itemKey}
                    //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-expect-error
                    renderScrollComponent={BottomSheetScrollView}
                />
            </Flex>
        </>
    )
}

const styles = StyleSheet.create({
    headerCard: {
        marginHorizontal: APP_MARGIN
    },
    listWrapper: {
        minHeight: 300,
        marginHorizontal: APP_MARGIN,
        marginTop: APP_MARGIN,
        overflow: 'hidden',
        flex: 1
    }
})