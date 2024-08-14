// 


import React, { useEffect, useRef, useMemo } from 'react';
import { View, Animated } from 'react-native';
import MapView, { Circle, MapCircle, MapCircleProps } from 'react-native-maps';

interface Location {
    lat: number;
    lng: number;
}

interface RippleProps {
    location: Location;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle as React.ComponentClass<MapCircleProps>);

const Ripple: React.FC<RippleProps> = React.memo(({ location }) => {
    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animate = () => {
            Animated.sequence([
                Animated.timing(animation, {
                    toValue: 1,
                    duration: 4000,
                    useNativeDriver: false,
                }),
                Animated.timing(animation, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: false,
                })
            ]).start(animate);
        };

        animate();

        return () => animation.stopAnimation();
    }, [animation]);

    const circles = useMemo(() => {
        return [0, 1].map((_, index) => (
            <AnimatedCircle
                key={index}
                center={{ latitude: location.lat, longitude: location.lng }}
                radius={animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 400],
                    extrapolate: 'clamp',
                })}
                strokeWidth={1}
                strokeColor={animation.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: ['rgba(188, 223, 255, 0.4)', 'rgba(188, 223, 255, 0.4)', 'rgba(188, 223, 255, 0)'],
                    extrapolate: 'clamp',
                })}
                fillColor={animation.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: ['rgba(188, 223, 255, 0.7)', 'rgba(188, 223, 255, 0.3)', 'rgba(188, 223, 255, 0)'],
                    extrapolate: 'clamp',
                })}
            />
        ));
    }, [animation, location]);

    return <View>{circles}</View>;
});

export default Ripple;