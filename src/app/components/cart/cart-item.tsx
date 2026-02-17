import React, { useCallback, useEffect, useState } from 'react';
import { Card, Checkbox, Divider, HelperText, IconButton, Text, useTheme } from 'react-native-paper';
import { ArticleCardCover } from '@components/article/article-card-cover';
import { APP_MARGIN } from '@shared/consts/app.const';
import { formatDeadline } from '@shared/features/format-deadline';
import { HStack, VStack } from 'react-native-flex-layout';
import { QuantityButtons } from '@shared/components/inputs/quantity-buttons';
import { StyleSheet, View } from 'react-native';
import { useCartAddItemsMutation } from '@store/query/cart/cart.api';
import { ToastService } from '@services/toast.service';
import { CartContentResponse } from '@store/query/cart/responses/cart-content.response';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import CartSelectors from '@store/cart/cart.selectors';
import { CartActions } from '@store/cart/cart.store';

interface CartItemProps {
    item: CartContentResponse,
}

const defaultMeta = (quantity: number) => {
    return {
        images: [],
        availability: quantity,
        checked: true,
        quantity: quantity
    }
}

export const CartItem = (
    {
        item,
    }: CartItemProps) => {
    const {
        quantity: itemQuantity,
        brand,
        number,
        description,
        deadline,
        deadlineMax,
        price,
        packing,
        comment,
        errorMessage,
        positionId
    } = item;
    const metaData = useAppSelector(CartSelectors.getItem(positionId));
    const {
        images,
        availability,
        checked,
        quantity
    } = metaData ?? defaultMeta(itemQuantity);

    const dispatch = useAppDispatch();

    const [addItem] = useCartAddItemsMutation();

    const [quantityText, setQuantityText] = useState(quantity.toString());
    const { colors } = useTheme();

    useEffect(() => {
        setQuantityText(quantity.toString());
    }, [item, metaData]);

    const deleteItem = useCallback(async () => {
        try {
            const result = await addItem([{
                ...item,
                quantity: 0
            }]).unwrap();

            if (result.status === 1) {
                dispatch(CartActions.deleteItem(positionId));
                ToastService.success(`Позиция ${brand} ${number} удалена`);
            } else {
                ToastService.error('Не удалось удалить позицию')
            }
        } catch (e) {
            ToastService.error((e as Error).message);
        }
    }, [item]);
    const changeCheck = useCallback(() => {
        dispatch(CartActions.updateItem({ checked: !checked, positionId }));
    }, [metaData]);
    const changeQuantity = useCallback((newQuantity: number) => {
        dispatch(CartActions.updateItem({ quantity: newQuantity, positionId }));
    }, [item]);

    return (
        <Card style={styles.card}>

            <HStack fill spacing={APP_MARGIN * 2}>

                <HStack center spacing={APP_MARGIN} mv={APP_MARGIN}>
                    <View>
                        <Checkbox
                            onPress={changeCheck}
                            status={checked ? 'checked' : 'unchecked'}/>
                    </View>
                    <ArticleCardCover images={images} width={100} height={100}/>
                </HStack>

                <VStack fill mv={APP_MARGIN} spacing={APP_MARGIN}>
                    <VStack>
                        <Text variant='titleMedium'>{brand}</Text>
                        <Text variant='titleMedium'>{number}</Text>
                    </VStack>

                    <Text>{description}</Text>
                </VStack>

            </HStack>

            <Divider style={styles.divider}/>

            <HStack mh={APP_MARGIN} justify='between' items='center' spacing={APP_MARGIN * 2}>
                <HStack spacing={APP_MARGIN * 2} items='center' justify='start' fill>
                    <Text>{formatDeadline(deadline, deadlineMax)}</Text>
                    <VStack>
                        <Text variant='labelSmall'>{price} ₽/шт.</Text>
                        <Text variant='titleMedium'>{price * quantity} ₽</Text>
                    </VStack>
                </HStack>

                <QuantityButtons
                    input={quantityText}
                    onInput={setQuantityText}
                    maxQuantity={availability || quantity}
                    quantityMultiplier={packing || 1}
                    value={quantity}
                    setValue={changeQuantity}
                />
            </HStack>

            {comment &&
                <>
                    <Text>Комментарий:</Text>
                    <Text>{comment}</Text>
                </>
            }

            {errorMessage &&
                <HelperText
                    type={'error'}
                >
                    Цена или наличие позиции устарела.
                </HelperText>
            }
            <IconButton
                iconColor={colors.error}
                icon={'delete'}
                size={16}
                style={styles.delete}
                onPress={deleteItem}
            />
        </Card>
    )
}

const styles = StyleSheet.create({
    divider: {
        marginHorizontal: APP_MARGIN,
        marginBottom: APP_MARGIN
    },
    card: {
        marginTop: APP_MARGIN,
        padding: APP_MARGIN
    },
    delete: {
        position: 'absolute',
        right: 0,
        top: 0
    }
})