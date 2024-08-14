import React from 'react';
import { View } from 'react-native';
import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"

const TicketConfirmation = ({ onClose }) => {
    return (
        <View className="flex-1 justify-center items-center bg-gray-100">
            <View className="bg-white p-6 rounded-lg shadow-md">
                <Text className="text-2xl font-bold text-green-600 mb-4">
                    Ticket Submitted Successfully!
                </Text>
                <Text className="text-gray-700 mb-6">
                    Thank you for your submission. We'll process your ticket shortly.
                </Text>
                <Button
                    onPress={onClose}
                    className="bg-blue-500 py-2 px-4 rounded-md"
                >
                    <Text className="text-white text-center font-semibold">
                        Close
                    </Text>
                </Button>
            </View>
        </View>
    );
};

export default TicketConfirmation;