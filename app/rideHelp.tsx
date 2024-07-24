import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from "@/components/ui/text"
import { SafeAreaView } from 'react-native-safe-area-context';
import { PhoneOutgoing, MessageCircle, Mail } from "@/lib/icons/icons"
import { Button } from '@/components/ui/button';

const HelpScreen = () => {
    return (
        // <SafeAreaView className="flex-1 bg-gray-100">
        <ScrollView className="flex-1 mt-[10%]">
            <View className="p-4">
                <Text variant={"heading"} className="font-bold font-header  text-foreground mb-1">Need Help?</Text>
                <Text className="text-sm text-gray-600 mb-[10%]">Your safety and satisfaction are our top priorities.</Text>

                <View className="bg-white rounded-lg shadow-md p-4 mb-4">
                    <Text variant={"smallTitle"} className="font-semibold mb-4">Emergency Assistance</Text>
                    <Button variant="destructive" className=" py-3 px-4 rounded-lg flex-row items-center justify-between mb-2">
                        <PhoneOutgoing size={24} color="white" />
                        <Text className="text-white font-bold ml-2 flex-1 text-center">Call Emergency Services</Text>
                    </Button>
                    <Text variant={"body"} className="text-sm text-foreground">In cases of immediate danger or serious medical emergency.</Text>
                </View>

                <View className="bg-white rounded-lg shadow-md p-4 my-4">
                    <Text variant={"smallTitle"} className="font-semibold mb-4">Contact Support</Text>

                    <Button variant="default" className="bg-primary py-3 px-4 rounded-lg flex-row items-center justify-between  mb-2">
                        <Mail size={24} color="white" />
                        <Text className="text-white font-bold ml-2 flex-1 text-center">Send Email</Text>
                    </Button>
                    <Text variant={'body'} className="text-sm text-gray-600 my-2">Our support team is available 24/7 to assist you.</Text>
                    <Text className="text-sm text-gray-600">All communications are secure and confidential.</Text>
                </View>



            </View>
        </ScrollView>
        // </SafeAreaView>
    );
};

export default HelpScreen;