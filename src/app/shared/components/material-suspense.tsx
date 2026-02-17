import React, { Suspense, SuspenseProps } from 'react';
import { Flex } from 'react-native-flex-layout';
import { ActivityIndicator } from 'react-native-paper';

export const MaterialSuspense = ({ children, ...props }: SuspenseProps) => {
    return (
        <Suspense {...props} fallback={<Flex><ActivityIndicator size='large' /></Flex>}>
            {children}
        </Suspense>
    )
}