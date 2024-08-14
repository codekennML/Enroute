import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { DollarSign, Clock, MapPin, Banknote } from 'lucide-react-native';

const CollectFareComponent = ({ fareDetails, onFareCollected, onIssueReported }) => {
    const [isCollecting, setIsCollecting] = useState(false);

    const handleCollectFare = () => {
        setIsCollecting(true);
        // Simulating a brief delay to show the "Collecting..." state
        setTimeout(() => {
            setIsCollecting(false);
            onFareCollected();
        }, 1000);
    };

    const handleReportIssue = () => {
        Alert.alert(
            "Report an Issue",
            "What problem are you experiencing?",
            [
                { text: "Passenger didn't pay", onPress: () => onIssueReported("Passenger didn't pay") },
                { text: "Fare amount incorrect", onPress: () => onIssueReported("Fare amount incorrect") },
                { text: "Other", onPress: () => onIssueReported("Other issue") },
                { text: "Cancel", style: "cancel" }
            ]
        );
    };

    return (
        <View className="bg-white p-4 rounded-xl shadow-lg">
            <Text className="text-2xl font-bold text-[#134071] mb-4">Collect Cash Fare</Text>

            <View className="bg-gray-100 p-4 rounded-lg mb-4">
                <View className="flex-row justify-between items-center mb-2">
                    <View className="flex-row items-center">
                        <DollarSign size={24} color="#134071" />
                        <Text className="text-xl font-semibold text-[#134071] ml-2">Total Fare</Text>
                    </View>
                    <Text className="text-xl font-bold text-[#134071]">${fareDetails.totalFare.toFixed(2)}</Text>
                </View>

                <View className="flex-row justify-between items-center mb-2">
                    <View className="flex-row items-center">
                        <Clock size={20} color="#134071" />
                        <Text className="text-[#134071] ml-2">Trip Duration</Text>
                    </View>
                    <Text className="text-[#134071]">{fareDetails.duration} mins</Text>
                </View>

                <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                        <MapPin size={20} color="#134071" />
                        <Text className="text-[#134071] ml-2">Distance</Text>
                    </View>
                    <Text className="text-[#134071]">{fareDetails.distance} km</Text>
                </View>
            </View>

            <View className="mb-4">
                <View className="flex-row items-center">
                    <Banknote size={24} color="#134071" />
                    <Text className="text-lg font-semibold text-[#134071] ml-2">Cash Payment</Text>
                </View>
            </View>

            <TouchableOpacity
                className={`bg-green-500 rounded-lg py-3 px-6 mb-2 ${isCollecting ? 'opacity-50' : ''}`}
                onPress={handleCollectFare}
                disabled={isCollecting}
            >
                <Text className="text-white font-semibold text-center">
                    {isCollecting ? 'Collecting...' : 'I Have Collected the Fare'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                className="bg-gray-200 rounded-lg py-3 px-6"
                onPress={handleReportIssue}
            >
                <Text className="text-[#134071] font-semibold text-center">Report an Issue</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CollectFareComponent;