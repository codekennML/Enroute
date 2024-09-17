import { COLOR_THEME } from '@/lib/constants';
import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Easing, Button, Dimensions } from 'react-native';

const ScreenWidth = Dimensions.get('window').width;

const HorizontalLoader = ({ onDismiss }) => {
    const translateX = useRef(new Animated.Value(40)).current;
    const animationRef = useRef<Animated.CompositeAnimation | null>(null);

    useEffect(() => {
        animationRef.current = Animated.loop(
            Animated.sequence([
                Animated.timing(translateX, {
                    toValue: ScreenWidth - 80, // End value set to ScreenWidth - 80
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(translateX, {
                    toValue: 40, // Back to initial value
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ])
        );
        animationRef.current.start();

        return () => {
            if (animationRef.current) {
                animationRef.current.stop();
            }
        };
    }, [translateX]);

    return (
        <View style={styles.loaderContainer}>
            <Animated.View style={[styles.loader, { transform: [{ translateX }] }]} />

        </View>
    );
};

const styles = StyleSheet.create({
    loaderContainer: {
        justifyContent: 'flex-start',

        height: 3,
        width: "100%",
        backgroundColor: COLOR_THEME.light.accent,
        // borderBottomWidth: 1
    },
    loader: {
        width: 15,

        borderBottomWidth: 2,
        borderColor: COLOR_THEME.light.primary,
        backgroundColor: COLOR_THEME.light.primary,
    },
});

export default HorizontalLoader;
