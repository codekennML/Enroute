import React from 'react';
import { View, Image } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { CheckCircle } from "@/lib/icons/icons"
import { router } from 'expo-router';
import { useAuth } from '@/lib/useAuth';
import { ROLES } from '@/lib/config/enum';

const DocumentVerificationScreen = () => {

    const { roles } = useAuth()

    const handleCompleteVerification = () => {

        router.replace({
            pathname: roles === ROLES.DRIVER ? "/driver" : "/rider"
        })
    }

    return (
        <View className="flex-col h-full items-center justify-center px-5 ">
            <View className='flex-1 mt-[15%]  items-center '>
                <CheckCircle size={80} className="text-primary mb-12 text-center" />
                <Text variant={"heading"} className="font-header text-gray-800 mb-2">
                    Verification in Progress
                </Text>

                <Text variant={"body"} className=" text-gray-600 my-8 text-justify">
                    Your documents are now in our secure verification process. We'll ensure
                    everything is in order and get back to you shortly.
                </Text>
                <View className="w-full mb-8">
                    <Text className="text-sm text-gray-600 mb-2">
                        • Typical verification time: 1-2 business days
                    </Text>
                    <Text className="text-sm text-gray-600 mb-2">
                        • We'll notify you once verification is complete
                    </Text>
                    <Text className="text-sm text-gray-600 mb-2">
                        • You can continue using the app in the meantime
                    </Text>
                </View>

            </View>

            <View className=' bg-white w-full pb-4'>
                <Button size={"lg"} rounded="base" className='flex-row items-center justify-center' variant={"default"} onPress={handleCompleteVerification}>
                    <Text variant={"smallTitle"} className='font-semibold'>Finish</Text>
                </Button>
            </View>
        </View>
    );
};

export default DocumentVerificationScreen;