import { Flex, VStack } from 'react-native-flex-layout';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HelperText, IconButton, Searchbar } from 'react-native-paper';
import { Keyboard, TextInput } from 'react-native';
import { APP_MARGIN, PLATE_NUMBER_LENGTH, VIN_LENGTH } from '@shared/consts/app.const';
import { MaterialBottomSheetScrollView } from '@shared/components/bottom-sheet/material-bottom-sheet-scroll-view';
import { VehicleSearch } from '@components/catalogue/vehicle-search';
import BottomSheet from '@gorhom/bottom-sheet';
import { useFindVehicleByPlateNumberMutation, useFindVehicleByVinMutation } from '@store/query/laximo/laximo.api';
import { FindVehicleByVinResponse } from '@store/query/laximo/responses/find-vehicle-by-vin.response';
import { FindVehicleByPlateNumberResponse } from '@store/query/laximo/responses/find-vehicle-by-plate-number.response';
import { router, useLocalSearchParams } from 'expo-router';

export default function CatalogueMain() {

    const [isActive, setIsActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [error, setError] = useState(false);
    const [data, setData] = useState<FindVehicleByVinResponse[] | FindVehicleByPlateNumberResponse | undefined>();

    const { redirectedVIN } = useLocalSearchParams<{ redirectedVIN: string }>();
    useEffect(() => {
        if (redirectedVIN) {
            setSearchValue(redirectedVIN);
            router.setParams({ redirectedVIN: '' })
            searchBarRef.current?.focus();
        }
    }, [redirectedVIN]);

    const bottomSheetRef = useRef<BottomSheet>(null);
    const searchBarRef = useRef<TextInput>(null);

    const [ findByVIN, { isLoading: isFindByVINLoading } ] = useFindVehicleByVinMutation();
    const [ findByPlateNumber, { isLoading: isFindByPlateNumberLoading } ] = useFindVehicleByPlateNumberMutation();

    const isLoading = isFindByVINLoading || isFindByPlateNumberLoading;

    const handleFocus = () => {
        setError(false);
        setIsActive(true);
    };

    const handleBlur = () => {
        setIsActive(false);
    };

    const expand = () => {
        Keyboard.dismiss();
        bottomSheetRef.current?.expand();
    }

    const search = useCallback(async () => {
        try {
            if (searchValue.length === VIN_LENGTH) {
                expand();
                const response = await findByVIN(searchValue).unwrap();
                setData(response);
            }
            else if (searchValue.length === PLATE_NUMBER_LENGTH){
                expand();
                const response = await findByPlateNumber(searchValue).unwrap();
                setData(response);
            }
            else
                setError(true)
        } catch (e) {

        }
    }, [searchValue]);

    return (
        <>
            <Flex fill center>
                <VStack ph={16} w='100%'>
                    <Searchbar
                        ref={searchBarRef}
                        onSubmitEditing={search}
                        value={searchValue}
                        onChangeText={(text) => {
                            setError(false);
                            setSearchValue(text);
                        }}
                        placeholder='Поиск по VIN, гос. номеру'
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        icon={isActive ? 'arrow-left' : undefined}
                        onIconPress={Keyboard.dismiss}
                        right={(searchValue.length && isActive) ?
                            ((props) =>
                                <IconButton
                                    size={24}
                                    icon={'magnify'}
                                    {...props}
                                    style={{ marginRight: APP_MARGIN }}
                                    onPress={search}
                                />)
                            : undefined}
                    />
                    {error && <HelperText type='error'>Введите корректный номер</HelperText>}
                </VStack>
            </Flex>
            <MaterialBottomSheetScrollView
                enablePanDownToClose
                snapPoints={['50%','100%']}
                bottomSheetRef={bottomSheetRef}
            >
                <VehicleSearch data={data} isLoading={isLoading}/>
            </MaterialBottomSheetScrollView>
        </>
    );
}
