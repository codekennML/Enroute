import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput } from 'react-native';
import { Input } from '../input';

interface OTPProps {
    length: number;
    onComplete: (value: string) => void;
}

const OTPInput: React.FC<OTPProps> = ({ length = 4, onComplete }) => {
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
    const inputRefs = useRef<(TextInput | null)[]>([]);

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleChange = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // Move to next input if current input is filled
        if (text && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        // Check if all inputs are filled
        if (newOtp.every(digit => digit !== '')) {
            onComplete(newOtp.join(''));
        }
    };

    const handleKeyPress = (event: { nativeEvent: { key: string } }, index: number) => {
        if (event.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <View className="flex-row justify-between">
            {otp.map((digit, index) => (
                <Input
                    key={index}
                    ref={(ref: TextInput | null) => inputRefs.current[index] = ref}
                    className="w-14 h-14 text-center text-xl border-2 border-foreground rounded-md mx-1 font-medium"
                    maxLength={1}
                    keyboardType="numeric"
                    value={digit}
                    onChangeText={(text: string) => handleChange(text, index)}
                    onKeyPress={(event) => handleKeyPress(event, index)}
                />
            ))}
        </View>
    );
};

export default OTPInput;