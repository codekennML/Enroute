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
            {/* <Button title="Dismiss" onPress={onDismiss} /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    loaderContainer: {
        justifyContent: 'flex-start',
        // alignItems: 'center',
        height: 5,
        width: "100%",
        backgroundColor: "light-blue",
        // borderBottomWidth: 1
    },
    loader: {
        width: 15,
        // height: 5,
        borderBottomWidth: 2,
        borderColor: "#007AFF",
        backgroundColor: '#007AFF',
    },
});

export default HorizontalLoader;
