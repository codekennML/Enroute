import React, { useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Controller, FieldValues, SetFieldValue } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { Progress } from '../progress';
import { Button } from '../button';
import { Plus } from '@/lib/icons/icons';
import { useUploadSingleFileMutation } from '@/redux/api/upload';
import { BACKEND_URL } from '@/redux/api/apiSlice';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '@/redux/slices/user';
import { SetErrorFunc } from '../dynamicField';
import { createImageSchema, imageSchema } from '@/app/verification/schemas';
import { Octagon } from 'lucide-react-native';
// import mime from "mime"

const R2_ACCOUNT_ID = process.env.EXPO_PUBLIC_R2_ACCOUNT_ID

console.log(R2_ACCOUNT_ID)
interface ImageUploadProps {
    name: string;
    control: any;
    label: string;
    errors: any;
    clearErrors: any
    setValue: SetFieldValue<FieldValues>
    setError: SetErrorFunc
}

const ImageUpload: React.FC<ImageUploadProps> = ({ name, control, label, errors, clearErrors, setError, setValue }) => {



    const { _id } = useSelector(selectUserInfo)
    const [image, setImage] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const [triggerUpload] = useUploadSingleFileMutation()

    const pickImage = async (onChange: (value: string) => void) => {

        clearErrors(name)

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result.assets)
        if (!result.canceled && result.assets && result.assets.length > 0) {


            const pickedImage = result.assets[0]

            const validation = createImageSchema(5).safeParse({
                type: pickedImage.mimeType,
                fileSize: pickedImage.fileSize,
            });

            if (!validation.success) {
                console.log("Failed")
                // alert(validation.error.errors[0].message); 
                setError(name, {
                    message: validation.error.errors[0].message,
                    type: "random"
                })

                return;
            }
            // console.log("Here")
            // setImage(pickedImage.uri);
            uploadImage(pickedImage, onChange);
        }

    };

    const uploadImage = async (image: ImagePicker.ImagePickerAsset, onChange: (value: string) => void) => {
        setIsUploading(true);
        setUploadProgress(0);

        // Create form data
        const formData = new FormData();

        formData.append('image', {
            name: image.uri.split('/').pop(),
            uri: image.uri,
            type: image.mimeType
        } as any);

        const bucketName = "verification"
        //This is the bucket name 
        formData.append("name", bucketName)

        try {
            // Simulated upload to a CDN

            // const response = await triggerUpload({
            //     file: formData,
            //     onUploadProgress: (progressEvent) => {
            //         const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 1));
            //         setUploadProgress(percentCompleted / 100);
            //     },
            // })

            // const { data, error } = response

            // if (error) throw { error } as unknown

            // const { uri } = data

            // const imageUri = `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${bucketName}/${uri}`


            setImage(image.uri)

            onChange(
                image.uri
                // imageUri
            )

        } catch (error) {
            // setValue("ABCRFG")
            // onChange("ABGRGET")
            const { data } = error
            console.log(error)
            let message = "Failed to upload file. Please try again"
            if (data) {
                message = data?.message
            }

            setError(name, {
                message,
                type: "random"
            })
            // console.error('Upload failed:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const removeImage = (onChange: (value: string) => void) => {
        clearErrors(name)
        setImage(null);
        onChange("");
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
                            className=" bg-accent rounded-md p-4 flex items-center justify-center h-20  w-[25%] "
                        >
                            <Plus size={28} className='text-foreground' />
                            {/* <Text className="text-gray-500 mt-2">Add image</Text> */}
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