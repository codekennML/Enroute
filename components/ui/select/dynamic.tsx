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

interface DynamicSelectProps {
    options: string[];
    value: string;
    onValueChange: (option: { value: string, label: string } | undefined) => void;
    label: string;
}

const DynamicSelect: React.FC<DynamicSelectProps> = ({
    options,
    value,
    onValueChange,
    label,
}) => {
    return (
        <Select onValueChange={onValueChange} className='border-border border-2  rounded-md'>
            <SelectTrigger className='w-full px-3 bg-white'>
                <SelectValue
                    className='text-foreground text-body font-medium'
                    placeholder={label}
                />
            </SelectTrigger>
            <SelectContent className='  w-[90%] bg-white text-sm'>
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