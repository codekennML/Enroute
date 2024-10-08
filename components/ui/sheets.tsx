import {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetModal,
} from '@gorhom/bottom-sheet';
import * as React from 'react';

import { useColorScheme } from '@/lib/useColorScheme';
import { COLOR_THEME } from '@/lib/constants';
import { Platform, Keyboard } from 'react-native';
import { useEffect, useState } from 'react';





const Sheet = React.forwardRef<
    BottomSheetModal,
    React.ComponentPropsWithoutRef<typeof BottomSheetModal> & { backdropOpacity?: number, pressBehaviour?: 'close' | 'none' }
>(({ index = 0, onChange, backgroundStyle, style, handleIndicatorStyle, backdropOpacity, pressBehaviour, ...props }, ref) => {

    const { colorScheme } = useColorScheme();
    const theme = colorScheme === "dark" ? COLOR_THEME.dark : COLOR_THEME.light


    // const [keyboardOpen, setKeyboardOpen] = useState(false);
    // const [enableDismissOnClose, setEnableDismissOnClose] = useState(true);

    // useEffect(() => {
    //     if (Platform.OS !== 'android') return;

    //     const keyboardDidShowListener = Keyboard.addListener(
    //         'keyboardDidShow',
    //         () => setKeyboardOpen(true),
    //     );

    //     const keyboardDidHideListener = Keyboard.addListener(
    //         'keyboardDidHide',
    //         () => setKeyboardOpen(false),
    //     );

    //     return () => {
    //         keyboardDidShowListener.remove();
    //         keyboardDidHideListener.remove();
    //     };
    // }, []);

    // useEffect(() => {
    //     if (keyboardOpen) {
    //         setEnableDismissOnClose(false);
    //     }
    // }, [keyboardOpen]);

    // useEffect(() => {
    //     if (!enableDismissOnClose && keyboardOpen) {
    //         setTimeout(() => {
    //             setEnableDismissOnClose(true);
    //         }, 10);
    //     }
    // }, [enableDismissOnClose, keyboardOpen])


    const renderBackdrop = React.useCallback(
        (backdropProps: BottomSheetBackdropProps) => (
            <BottomSheetBackdrop
                {...backdropProps}
                disappearsOnIndex={-1}
                opacity={backdropOpacity ?? 0.5}
                pressBehavior={pressBehaviour}
            // onPress={() => {
            //     if (!enableDismissOnClose && keyboardOpen) {
            //         setEnableDismissOnClose(true);
            //     }
            //     //    ref?.
            // }}
            />
        ),
        [backdropOpacity, pressBehaviour]
    );
    return (
        <BottomSheetModal
            ref={ref}
            index={0}

            backgroundStyle={
                backgroundStyle ?? {
                    backgroundColor: theme.card
                }
            }
            // enableDismissOnClose={enableDismissOnClose}
            style={
                style ?? {
                    // borderWidth: 1,
                    // flex: 0,
                    // minHeight: 100,
                    borderColor: theme.border,
                    borderTopStartRadius: 16,
                    borderTopEndRadius: 16,
                }
            }
            handleIndicatorStyle={
                handleIndicatorStyle ?? {
                    backgroundColor: theme.background
                }
            }
            onChange={onChange}
            // enableDynamicSizing={true}
            backdropComponent={renderBackdrop}
            {...props}
        />
    );
});

function useSheetRef() {
    return React.useRef<BottomSheetModal>(null);
}

export { Sheet, useSheetRef };