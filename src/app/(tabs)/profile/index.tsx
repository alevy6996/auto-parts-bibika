import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileComponent } from '@components/profile/profile.component';
import { Flex, HStack, VStack } from 'react-native-flex-layout';
import { ActivityIndicator, Button, FAB } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import UserSelectors from '@store/user/user.selectors';
import { useLogoutMutation } from '@store/query/user/user.api';
import BottomSheet from '@gorhom/bottom-sheet';
import { TabBarActions } from '@store/tab-bar/tab-bar.store';
import { MaterialBottomSheetView } from '@shared/components/bottom-sheet/material-bottom-sheet-view';
import UserUpdateForm from '@components/profile/user-update-form';

export default function Index() {
    const [needForm, setNeedForm] = useState(false);

    const user = useAppSelector(UserSelectors.getUser);
    const [logout, { isLoading }] = useLogoutMutation();

    const dispatch = useAppDispatch();

    const bottomSheetRef = useRef<BottomSheet>(null);

    const handlePress = () => {
        dispatch(TabBarActions.hideTabBar());
        setNeedForm(true);
        setTimeout(() => bottomSheetRef.current?.snapToIndex(0), 200);
    }

    if (!user || isLoading) {
        return (
            <Flex fill center>
                <ActivityIndicator size='large'/>
            </Flex>
        )
    }

    return (
        <>
            <SafeAreaView/>
            <VStack fill m={16}>
                <ProfileComponent user={user}/>

                <HStack items='end' justify='between'>
                    <Button
                        onPress={logout}
                        mode='outlined'
                    >
                        Выйти
                    </Button>
                    <FAB
                        icon={{
                            source: 'pencil',
                            direction: 'ltr'
                        }}
                        onPress={handlePress}
                        label={'Редактировать'}
                    />
                </HStack>
            </VStack>

            <MaterialBottomSheetView
                snapPoints={[400, '100%']}
                onSheetClose={() => dispatch(TabBarActions.showTabBar())}
                bottomSheetRef={bottomSheetRef}
            >
                {needForm && <UserUpdateForm/>}
            </MaterialBottomSheetView>
        </>
    );
}