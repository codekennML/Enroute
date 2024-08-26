// src/components/Toast.tsx
import React from 'react';
import { Dimensions, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Portal } from '@rn-primitives/portal';
import * as ToastPrimitive from '@rn-primitives/toast';
import { useSelector } from 'react-redux';// Assuming your RootState is defined
import { hideToast, toastState } from '@/redux/slices/toast';
import { useAppDispatch } from '@/redux/hooks';
import { Text } from "./text"
import { Info } from "@/lib/icons/icons"

const Toast: React.FC = () => {
    const { message, type, isVisible, title, notification } = useSelector(toastState)
    const insets = useSafeAreaInsets();
    const { width, height } = Dimensions.get("window")

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                dispatch(hideToast());
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [isVisible, dispatch]);

    return (
        <>
            {isVisible && (
                <Portal name='toast'>
                    <View style={{ top: insets.top + 4 }} className='px-4 absolute w-full'>
                        <ToastPrimitive.Root
                            type={type}
                            open={isVisible}
                            onOpenChange={(open) => !open && dispatch(hideToast())}
                            className={`bg-accent border-border flex-row justify-between items-center p-4 rounded-md ${notification === "danger" ? "bg-destructive-foreground" : "bg-accent"}`}
                        >
                            <View className='gap-1.5'>
                                {/* <ToastPrimitive.Title className='text-foreground text-sm'>{title}</ToastPrimitive.Title> */}
                                <ToastPrimitive.Description className='text-foreground text-sm max-w-[80%] overflow-hidden '>
                                    <View className='flex flex-row gap-x-2 items-center max-w-[80%] overflow'>
                                        <View>

                                            <Info size={18} className={`${notification === "danger" ? "text-white" : notification === "success" ? "text-green-600" : notification === "warning" ? "text-amber-500" : "text-foreground"} `} />

                                        </View>
                                        <View className='max-w-[75%]'>

                                            <Text variant={"body"} className={`${notification === "danger" ? "text-white" : notification === "success" ? "text-green-600" : notification === "warning" ? "text-amber-500" : "text-foreground"} `}>{message}</Text>

                                        </View>
                                    </View>
                                </ToastPrimitive.Description>
                            </View>
                            {/* <View className='gap-2'> */}
                            {/* <ToastPrimitive.Close className={`border border-primary px-4 py-2`}> */}
                            {/* <Text className='text-foreground'>Close</Text> */}
                            {/* </ToastPrimitive.Close> */}
                            {/* </View> */}
                        </ToastPrimitive.Root>
                    </View>
                </Portal>
            )}
        </>
    );
};

export default Toast;
