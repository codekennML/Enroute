

import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { format } from 'date-fns';
import { Button } from '../button';
import { Text } from "@/components/ui/text"
import { router } from 'expo-router';
import { setTripType, updateOtherTripData } from '@/redux/slices/search';
import { useAppDispatch } from '@/redux/hooks';

interface DatePickerProps {
    datePickerOpen: boolean,
    setDatePickerOpen: Dispatch<SetStateAction<boolean>>
    handleSheetVisibility?: (value: boolean) => void
    handleConfirm: (when: Date) => void

}

const CustomDatePicker: React.FC<DatePickerProps> = ({ handleSheetVisibility, datePickerOpen, setDatePickerOpen, handleConfirm }) => {

    // const dispatch = useAppDispatch()

    const [localDate, setLocalDate] = useState(new Date());
    const [pickerState, setPickerState] = useState<'idle' | 'spinning'>('idle');

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);



    const handleStateChange = (newState: 'idle' | 'spinning') => {
        setPickerState(newState);
    };

    return (
        <View className="px-6 flex-col justify-between h-full">
            <View className='flex-1 items-center justify-center'>
                <DatePicker
                    mode="datetime"
                    open={datePickerOpen}
                    date={localDate}
                    onDateChange={setLocalDate}
                    onCancel={() => {
                        // setOpen(false);
                        setDatePickerOpen(false)
                        if (handleSheetVisibility) {
                            handleSheetVisibility(false);
                        }
                    }}
                    minimumDate={minDate}
                    maximumDate={maxDate}
                    minuteInterval={30}
                    buttonColor='green'
                    dividerColor='#134071'
                    onStateChange={handleStateChange}
                />
            </View>
            <View className='pb-12'>
                <View className='flex-row items-center justify-center pb-4'>

                    <Text className='font-semibold'>    {format(localDate, 'MMMM d, yyyy -  HH:mm')}</Text>
                </View>
                <Button
                    variant={"default"}
                    onPress={() => handleConfirm(localDate)}
                    className="rounded-lg py-3 px-4 flex-row items-center justify-center"
                    disabled={pickerState === 'spinning'}
                >
                    <Text variant={"smallTitle"} className="" color="light">
                        Continue
                    </Text>
                </Button>
            </View>
        </View>
    );
};

export default CustomDatePicker;