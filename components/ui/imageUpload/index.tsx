import React, { useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { Progress } from '../progress';
import { Button } from '../button';
import { Plus } from '@/lib/icons/icons';

interface ImageUploadProps {
    name: string;
    control: any;
    label: string;
    errors: any;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ name, control, label, errors }) => {
    const [image, setImage] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const pickImage = async (onChange: (value: string | null) => void) => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setImage(result.assets[0].uri);
            uploadImage(result.assets[0].uri, onChange);
        }
    };

    const uploadImage = async (uri: string, onChange: (value: string | null) => void) => {
        setIsUploading(true);
        setUploadProgress(0);

        // Simulate file reading
        const file = await fetch(uri).then(r => r.blob());

        // Create form data
        const formData = new FormData();
        formData.append('file', file as any);

        try {
            // Simulated upload to a CDN
            const response = await axios.post('https://your-cdn-upload-url.com/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 1));
                    setUploadProgress(percentCompleted / 100);
                },
            });

            // Simulated CDN response
            const cdnUrl = `https://your-cdn.com/images/${response.data.filename}`;
            setImage(cdnUrl);
            onChange(cdnUrl);
        } catch (error) {
            console.error('Upload failed:', error);
            // Handle error (e.g., show an error message to the user)
        } finally {
            setIsUploading(false);
        }
    };

    const removeImage = (onChange: (value: string | null) => void) => {
        setImage(null);
        onChange(null);
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
                <View className="w-full mb-4">
                    {/* <Text className="text-sm font-medium text-foreg mb-1">{label}</Text> */}
                    {isUploading ? (
                        <View className="border-2 border-dashed border-gray-300 rounded-md p-4 flex items-center justify-center h-40">
                            <Progress
                                value={uploadProgress}
                                className='web:w-[60%]'
                            //   progress={uploadProgress} 
                            // size={50} 
                            // showsText={true} 
                            // formatText={() => `${Math.round(uploadProgress * 100)}%`}
                            />
                            <Text className="text-gray-500 mt-2">Uploading...</Text>
                        </View>
                    ) : image ? (
                        <View className="relative">
                            <Image
                                source={{ uri: image }}
                                className="w-full h-40 rounded-md"
                                resizeMode="cover"
                            />
                            <Button
                                onPress={() => removeImage(onChange)}
                                className="absolute top-2 right-2 bg-white rounded-full p-1"
                            >
                                <Ionicons name="close-circle" size={24} color="red" />
                            </Button>
                        </View>
                    ) : (
                        <Button
                            variant="ghost"
                            onPress={() => pickImage(onChange)}
                            className=" bg-white rounded-md p-4 flex items-center justify-center h-20  w-[25%] "
                        >
                            <Plus size={32} className='text-foreground' />
                            {/* <Text className="text-gray-500 mt-2">Tap to select an image</Text> */}
                        </Button>
                    )}
                    {errors[name] && (
                        <Text className="text-red-500 text-xs mt-1">{errors[name].message}</Text>
                    )}
                </View>
            )}
        />
    );
};

export default ImageUpload;