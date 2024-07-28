import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle, Dispatch, SetStateAction } from 'react';
import { View, Text, Image, Alert, Linking } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { Progress } from '../progress';
import { Button } from '../button';

export type AppCameraRef = {
    capturePhoto: () => void;
    removeImage: () => void;

};

type AppCameraProps = {
    onImageChange?: (image: string | null) => void;
    image?: string
    setImage: Dispatch<SetStateAction<string | undefined>>
};

const AppCamera = forwardRef<AppCameraRef, AppCameraProps>(({ onImageChange, setImage, image }, ref) => {


    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [isCameraActive, setIsCameraActive] = useState(true);
    const { hasPermission, requestPermission } = useCameraPermission();
    const device = useCameraDevice('back');

    const cameraRef = useRef<Camera>(null);

    useEffect(() => {
        (async () => {
            const status = await Camera.requestCameraPermission();
            if (status === 'denied') {
                Alert.alert(
                    "Camera Permission Required",
                    "We need access to your camera to take a photo. Please grant permission in your device settings.",
                    [
                        { text: "Cancel", style: "cancel" },
                        { text: "Open Settings", onPress: () => Linking.openSettings() }
                    ]
                );
            }
        })();
    }, []);

    useImperativeHandle(ref, () => ({

        capturePhoto: async () => {
            if (cameraRef.current) {
                try {
                    const photo = await cameraRef.current.takePhoto({
                        enableAutoDistortionCorrection: true,
                        flash: 'off',
                    });

                    const filePath = `file://${photo.path}`;
                    const result = await fetch(filePath);
                    const data = await result.blob();
                    setImage(filePath);
                    setIsCameraActive(false);
                    if (onImageChange) {
                        onImageChange(filePath);
                    }
                } catch (error) {
                    console.error('Failed to take photo:', error);
                    Alert.alert("Error", "Failed to capture photo. Please try again.");
                }
            }
        },
        removeImage: () => {
            try {
                console.log("Here")
                setImage(undefined);
                if (onImageChange) {
                    onImageChange(null);
                }
                setIsCameraActive(true)

            } catch (e) {
                console.log(e)
            }
        },

    }));

    if (!hasPermission) {
        return (
            <Button
                variant="ghost"
                onPress={requestPermission}
                className="border-2 border-dashed border-gray-300 rounded-md p-4 flex items-center justify-center h-40 w-40"
            >
                <Ionicons name="camera-outline" size={40} color="gray" />
                <Text className="text-gray-500 mt-2">Grant Camera Permission</Text>
            </Button>
        );
    }

    if (isUploading) {
        return (
            <View className="border-2 border-dashed border-gray-300 rounded-md p-4 flex items-center justify-center h-40 w-40">
                <Progress value={uploadProgress} className="web:w-[60%]" />
                <Text className="text-gray-500 mt-2">Uploading...</Text>
            </View>
        );
    }

    if (isCameraActive && device && !image) {
        return (
            <Camera
                photoQualityBalance='quality'
                ref={cameraRef}
                style={{ height: "100%", width: "100%" }}
                device={device}
                isActive={true}
                photo={true}
                className='rounded-full w-full'
            />

        );
    }


    return null;
});

export default AppCamera;

