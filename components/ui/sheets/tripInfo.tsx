import { View, } from 'react-native';
import React, { useState, useEffect, forwardRef, SetStateAction } from 'react';
import { Sheet, useSheetRef } from '../sheets';
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { Button } from '../button';
import { Checkbox } from "@/components/ui/checkbox"
import { Text } from "../text"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../card';
import { X, UserCog, Wallet, Luggage, PenLine, MessageSquare, Minus, Plus, UserPlus } from '@/lib/icons/icons';
import AddRider from './addRider';


interface TripInfoProps {

    closeSheet: () => void
    snapPoints: string[];
    type: string
}

// ForwardRef is typed to BottomSheetModal
const TripData = forwardRef<BottomSheetModal, TripInfoProps>(
    ({ snapPoints, closeSheet, type }, ref) => {

        const [checked, setChecked] = useState(false);
        const [sheetToOpen, setSheetToOpen] = useState<string>("")
        const addRiderSheetRef = useSheetRef()
        const sendDetailSheetRef = useSheetRef()
        const commentSheetRef = useSheetRef()
        const budgetSheetRef = useSheetRef()

        useEffect(() => {
            console.log("open", sheetToOpen)
            if (sheetToOpen) {

                switch (sheetToOpen) {
                    case "addRider":
                        addRiderSheetRef.current?.present();
                        break;
                    case "sendDetail":
                        sendDetailSheetRef.current?.present();
                        break;
                    case "comment":
                        commentSheetRef.current?.present();
                        break;
                    case "budget":
                        budgetSheetRef.current?.present();
                        break;
                    default:
                        break;
                }

            }

            if (!sheetToOpen) {
                addRiderSheetRef.current?.close();

            }
        }, [sheetToOpen])


        return (
            <>
                {/* <Sheet ref={ref} snapPoints={snapPoints}> */}

                {/* </Sheet> */}

                <AddRider ref={addRiderSheetRef} snapPoints={["60%"]} closeSheet={setSheetToOpen} />
            </>
        );
    }
);

TripData.displayName = 'TripData';

export default TripData;
