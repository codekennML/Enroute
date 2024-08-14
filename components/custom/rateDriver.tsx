import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { Star } from '@/lib/icons/icons';
import { Button } from '../ui/button';

const RateYourDriverScreen = ({ driverName, onSubmitRating }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleStarPress = (selectedRating) => {
        setRating(selectedRating);
    };

    const handleSubmit = () => {
        if (rating === 0) {
            // Show an error message or alert here
            console.log('Please select a rating before submitting');
            return;
        }
        onSubmitRating({ rating, comment });
    };

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="p-6">
                <Text className="text-2xl font-bold text-[#134071] mb-6 text-center">
                    Rate Your Driver
                </Text>

                <Text className="text-lg text-[#134071] mb-4 text-center">
                    How was your ride with {driverName}?
                </Text>

                <View className="flex-row justify-center mb-8">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Button
                            key={star}
                            onPress={() => handleStarPress(star)}
                            className="mx-2"
                        >
                            <Star
                                size={40}
                                color={star <= rating ? '#FFD700' : '#D3D3D3'}
                                fill={star <= rating ? '#FFD700' : 'none'}
                            />
                        </Button>
                    ))}
                </View>

                <Text className="text-lg text-[#134071] mb-2">
                    Leave a comment (optional):
                </Text>
                <TextInput
                    className="border border-[#134071] rounded-lg p-3 text-[#134071] mb-6"
                    placeholder="Your feedback helps us improve..."
                    placeholderTextColor="#A0AEC0"
                    multiline
                    numberOfLines={4}
                    value={comment}
                    onChangeText={setComment}
                />

                <Button
                    onPress={handleSubmit}
                    className={`bg-[#134071] rounded-lg py-4 ${rating === 0 ? 'opacity-50' : ''}`}
                    disabled={rating === 0}
                >
                    <Text className="text-white text-center text-lg font-semibold">
                        Submit Rating
                    </Text>
                </Button>
            </View>
        </ScrollView>
    );
};

export default RateYourDriverScreen;