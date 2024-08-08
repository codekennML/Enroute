import React, { forwardRef } from 'react';
import { TextInput, View, TouchableOpacity, } from 'react-native';
import { Textarea } from "../ui/textarea";
import { Text } from "../ui/text"

interface TextAreaProps {
    inputTitle?: string
    placeholder?: string;
    value: string;
    inputSubtitle?: string
    onChange: (text: string) => void;
}

const CustomTextArea = forwardRef<TextInput, TextAreaProps>(
    ({ placeholder = 'Anything can go here', value, onChange, inputSubtitle, inputTitle }, ref) => {
        const handleChangeText = (text: string) => {
            onChange(text);
        };

        return (
            <View className="my-6">
                {
                    inputTitle &&
                    <Text variant={"smallTitle"} className='font-semibold text-sm pb-3'>{inputTitle}</Text>
                }
                <Textarea
                    ref={ref}
                    className='text-foreground placeholder:text-foreground/80 text-sm font-medium px-3 py-4 bg-accent min-h-[150px] placeholder:text-sm'
                    placeholder={placeholder}
                    value={value}
                    onChangeText={handleChangeText}
                    aria-labelledby='textareaLabel'
                />
                {
                    inputSubtitle &&
                    <Text className='text-xs text-destructive mt-1'>{inputSubtitle}</Text>
                }

            </View>
        );
    }
);

export default CustomTextArea;
