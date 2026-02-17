import React, { useCallback, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CartItem } from '@components/cart/cart-item';
import { KeyboardAvoidingView } from 'react-native';
import { useCartAddItemsMutation, useCartContentQuery, useClearCartMutation } from '@store/query/cart/cart.api';
import { ToastService } from '@services/toast.service';
import { CartHeader } from '@components/cart/cart-header';
import { CartFooter } from '@components/cart/cart-footer';
import { CartEmpty } from '@components/cart/cart-empty';
import { MaterialActivityIndicator } from '@shared/components/material-activity-indicator';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { CartActions } from '@store/cart/cart.store';
import CartSelectors from '@store/cart/cart.selectors';
import { CartContentMeta } from '@shared/types/cart-content-meta';
import { CartContentResponse } from '@store/query/cart/responses/cart-content.response';
import { ResponseService } from '@services/response.service';
import { NetworkError } from '@shared/errors/network.error';
import { PersistCart } from '@shared/features/persist-data';

export default function Cart() {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const metaData = useAppSelector(CartSelectors.getCart);

    const { data = [], isFetching, isLoading, refetch } = useCartContentQuery();

    const [addItems] = useCartAddItemsMutation();
    const [clearCart] = useClearCartMutation();

    const clearCartState = useCallback(() => dispatch(CartActions.setCartItems([])), [])
    const createNewMetaItem = useCallback((item: CartContentResponse): CartContentMeta => {
        return {
            ...item,
            images: [],
            availability: item.quantity,
            checked: true
        }
    }, []);

    const changeCartQuantities = useCallback(async (newItems: CartContentResponse[]) => {
        try {
            const deleteItems = newItems.map(item => {
                return {
                    ...item,
                    quantity: 0,
                }
            })

            // delete old items
            let result = await addItems(deleteItems).unwrap();
            if (result.status !== 1) {
                ToastService.error(result.errorMessage);
            }
            console.log('items deleted');

            // add new items
            result = await addItems(newItems).unwrap();
            if (result.status !== 1) {
                ToastService.error(result.errorMessage);
            }
            console.log('items re-added');

            const ids = result.positions.map((position, index) => {
                return {
                    oldId: deleteItems[index].positionId,
                    newId: position.cartPositionId
                }
            })
            dispatch(CartActions.updateCurrentOrderIds(ids));
        } catch (e) {
            let error: Error | NetworkError = e as Error;
            if(!error.message) error = new NetworkError(e as NetworkError);

            const errorMessage = ResponseService.getErrorMessage(error) || 'Ошибка обновления количества деталей';
            ToastService.error(errorMessage);
        }
    }, []);
    const applyChanges = useCallback(async () => {
        const newItems: CartContentResponse[] = [];

        for (const metaDataItem of metaData) {
            const item = data.find(item => item.positionId === metaDataItem.positionId);
            if (!item) continue;
            if (item.quantity === metaDataItem.quantity) continue;
            newItems.push({ ...item, quantity: metaDataItem.quantity });
        }
        if (!newItems.length) return;

        dispatch(CartActions.setUpdating(true));

        await changeCartQuantities(newItems);

        dispatch(CartActions.setUpdating(false));
    }, [metaData, data])

    const deleteUnnecessaryData = useCallback(() => {
        const deleteItems = metaData.filter(item => !data.find(value => value.positionId === item.positionId))
            .map(item => item.positionId);

        dispatch(CartActions.deleteItems(deleteItems));
    }, [data, metaData]);
    const checkQuantities = useCallback(() => {
        data.forEach(item => {
            const found = metaData.find(value => value.positionId === item.positionId);
            if (!found) {
                const newItem = createNewMetaItem(item);
                dispatch(CartActions.addItem(newItem));
            } else if (found.quantity !== item.quantity) {
                dispatch(CartActions.updateItem({ positionId: item.positionId, quantity: item.quantity }));
            }
        })
    }, [data, metaData]);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        return navigation.addListener('blur', async () => {
            await applyChanges();
            checkQuantities();
            deleteUnnecessaryData();
            await PersistCart();
        });
    }, [navigation, data, metaData]);
    useEffect(() => {
        checkQuantities();
    }, [data]);

    const handleClearCart = async () => {
        try {
            const result = await clearCart().unwrap();

            if (result.status === 1) {
                clearCartState();
                ToastService.success('Корзина очищена');
            } else ToastService.error(result.errorMessage);

        } catch (e) {
            ToastService.error((e as Error).message);
        }
    }

    if (isLoading || (isFetching && !data.length)) return <MaterialActivityIndicator/>
    if (!data.length) return <CartEmpty/>

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <SafeAreaView/>
            <CartHeader
                itemsNumber={data.length}
                onClear={handleClearCart}
            />

            <FlashList
                estimatedItemSize={280}
                keyExtractor={item => item.positionId.toString()}
                keyboardDismissMode={'on-drag'}
                refreshing={isFetching || isLoading}
                onRefresh={refetch}
                contentContainerStyle={{
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                }}
                data={data}
                renderItem={({ item }) =>
                    <CartItem item={item}/>
                }
            />
            <CartFooter/>
        </KeyboardAvoidingView>
    )
}