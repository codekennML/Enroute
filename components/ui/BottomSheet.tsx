import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView, BottomSheetBackdropProps, } from '@gorhom/bottom-sheet';
import { useColorScheme } from '@/lib/useColorScheme';
import { COLOR_THEME } from '@/lib/constants';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, } from 'react-native-reanimated';


const AppBottomSheet = React.forwardRef<
  BottomSheet,
  React.ComponentPropsWithoutRef<typeof BottomSheet> & { backdropOpacity?: number, pressBehaviour?: 'close' | 'none', enableTouchThrough?: boolean, showBackdrop?: boolean }
>(({ index = 0, onChange, backgroundStyle, style, handleIndicatorStyle, backdropOpacity, pressBehaviour, enableTouchThrough, showBackdrop, ...props }, ref) => {

  const { colorScheme } = useColorScheme();

  const theme = colorScheme === "dark" ? COLOR_THEME.dark : COLOR_THEME.light

  const renderBackdrop = React.useCallback(
    (backdropProps: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        // enableTouchThrough={true}
        style={{
          display: "none"
        }}
        {...backdropProps}
        enableTouchThrough={enableTouchThrough}
        disappearsOnIndex={-1}
        opacity={backdropOpacity ?? 0.5}
        pressBehavior={pressBehaviour}


      />
    ),
    [backdropOpacity, pressBehaviour]
  );
  return (
    <BottomSheet
      ref={ref}
      index={0}
      backgroundStyle={
        backgroundStyle ?? {
          backgroundColor: theme.card

        }
      }
      style={
        style ?? {


          borderColor: theme.border,
          borderTopStartRadius: 16,
          borderTopEndRadius: 16,
          backgroundColor: theme.primary
        }
      }
      // bottomInset={24}
      // containerStyle={{
      //   backgroundColor: "pink",

      //   // maxHeight: "100%",
      //   minHeight: "100%",
      //   // height: "90%"


      // }}



      handleIndicatorStyle={
        handleIndicatorStyle ?? {
          backgroundColor: theme.background
        }
      }
      onChange={onChange}

      // backdropComponent={showBackdrop ? renderBackdrop : null}
      {...props}
    />
  );
});

function useAppBottomSheetRef() {
  return React.useRef<BottomSheet>(null);
}


export { AppBottomSheet, useAppBottomSheetRef };



