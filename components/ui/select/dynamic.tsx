import React from 'react';
import { View } from 'react-native';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { FieldValues, SetFieldValue } from 'react-hook-form';

interface DynamicSelectProps {
    options: string[];
    value: string;
    onValueChange: (option: { value: string, label: string } | undefined) => void;
    label: string;
    onOpenChange: (value: boolean) => void
    isFocused: boolean
}

const DynamicSelect: React.FC<DynamicSelectProps> = ({
    options,
    value,
    isFocused,
    onValueChange,
    label,
    onOpenChange
}) => {

    console.log(isFocused, "Milla", value)

    return (
        <Select onValueChange={onValueChange} onOpenChange={onOpenChange} className={`border-2 rounded-md ${isFocused ? "border-primary" : "border-border"}`}>
            <SelectTrigger className='w-full px-3 bg-white'>
                <SelectValue
                    className='text-foreground text-body font-medium'
                    placeholder={""}
                />
            </SelectTrigger>
            <SelectContent className='  min-w-[87%] mt-1.5 bg-white text-sm'>
                <SelectGroup className='text-sm'>
                    {options.map((option) => (
                        <SelectItem key={option} value={option} label={option} className='text-foreground font-medium text-lg'>
                            {option}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export default DynamicSelect;