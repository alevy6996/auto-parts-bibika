import { APP_MARGIN } from '@shared/consts/app.const';
import { VStack } from 'react-native-flex-layout';
import { ArticleCardCover } from '@components/article/article-card-cover';
import { Text } from 'react-native-paper';
import React from 'react';
import { OrdersPosition } from '@store/query/orders/response/orders.response';
import { StyleSheet } from 'react-native';

interface MinimizedOrderPositionProps {
    images: string[],
    position: OrdersPosition,
    imageSize: number
}

export const MinimizedOrderPosition = ({ images, position, imageSize }: MinimizedOrderPositionProps) => {

    return (
        <VStack
            p={APP_MARGIN}
        >
            <ArticleCardCover
                imageWrapperStyle={{
                    borderWidth: 1,
                    borderColor: `#${position.statusColor}`
                }}
                images={images}
                width={imageSize}
                height={imageSize}
            />

            {!images.length &&
                <VStack fill center position='absolute' top={imageSize / 2 - APP_MARGIN} self='center'>
                    <Text style={styles.labelText} variant='labelSmall'>{position.brand}</Text>
                    <Text style={styles.labelText} variant='labelSmall'>{position.number}</Text>
                </VStack>
            }
        </VStack>
    )
}

const styles = StyleSheet.create({
    labelText: {
        color: 'rgb(40,40,40)',
        fontSize: 10
    }
})