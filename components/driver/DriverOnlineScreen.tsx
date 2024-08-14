import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { AlertTriangle } from 'lucide-react-native';

const EndRideConfirmationPopup = ({ isVisible, onConfirm, onCancel }) => {
    return (
        <Modal
            transparent={true}
            visible={isVisible}
            animationType="fade"
        >
            <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
                <View className="bg-white rounded-xl p-6 m-4 w-5/6 max-w-sm">
                    <View className="items-center mb-4">
                        <AlertTriangle size={48} color="#134071" />
                    </View>

                    <Text className="text-xl font-bold text-[#134071] text-center mb-4">
                        End Ride Confirmation
                    </Text>

                    <Text className="text-[#134071] text-center mb-6">
                        Are you sure you want to end this ride?
                    </Text>

                    <View className="flex-row justify-between">
                        <TouchableOpacity
                            onPress={onCancel}
                            className="bg-gray-200 rounded-lg py-3 px-6 flex-1 mr-2"
                        >
                            <Text className="text-[#134071] font-semibold text-center">Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={onConfirm}
                            className="bg-red-500 rounded-lg py-3 px-6 flex-1 ml-2"
                        >
                            <Text className="text-white font-semibold text-center">End Ride</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default EndRideConfirmationPopup;