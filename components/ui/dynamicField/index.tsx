
import { DynamicField } from "@/app/(verification)/multistep";
import { Controller } from "react-hook-form";
import { ScrollView, View } from "react-native";
import ImageUpload from "../imageUpload";
import { Input } from "../input";
import DynamicSelect from "../select/dynamic";
import { Text } from "../text"
import { useState } from "react";
import { calculateAge } from "@/app/verification/schemas";
import { UseFormSetError, FieldValues, FieldPath, Path, FieldPathValue, SetFieldValue } from "react-hook-form"
import { predictions } from "@/components/constants/predictions";
import StationList from "@/components/driver/stationList";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../dropdown";



// Type definition for setError
export type SetErrorFunc<TFieldValues extends FieldValues = FieldValues> = UseFormSetError<TFieldValues>;



export interface ControllerProps {
    field: DynamicField,
    control: any,
    errors: any
    clearErrors: any
    setError: SetErrorFunc
    setValue: SetFieldValue<FieldValues>
}


const DynamicFieldComponent: React.FC<ControllerProps> = ({ field, control, errors, setError, setValue, clearErrors }: any) => {

    const [focusedInput, setFocusedInput] = useState<string | undefined>(undefined)
    // const [localError, setLocalError] = useState("");


    const { name, displayName, options, placeholder } = field;
    console.log(focusedInput)

    const handleFocus = (name: string) => {
        console.log(name, focusedInput)
        setFocusedInput(name)
    }

    const handleOpenChange = (value: boolean, name: string) => {
        console.log(value, typeof value)

        value ? setFocusedInput(name) : setFocusedInput(undefined)

    }

    const handleChangeOption = (name: string, option: { value: string; label: string; } | undefined) => {
        if (errors[name]) {
            clearErrors(name)
        }
        //Clear the errors first then set the value , so if there is another errror, it  will highlight
        setValue(name, option?.value)
    }

    switch (options.type) {
        case 'text':
        case "number":
            return (
                <Controller
                    name={name}
                    control={control}
                    render={({ field: { onChange, value, } }) => (
                        <View className="pb-2">
                            <Text variant="body" className='font-medium pb-3 text-muted-foreground dark:text-foreground'>{displayName}</Text>
                            <Input
                                onChangeText={onChange}
                                value={value}
                                onFocus={() => handleFocus(name)}
                                // onBlur={() => setFocusedInput(undefined)}
                                inputMode={options.type === "number" ? "numeric" : undefined}
                                className={`h-12 border-2 border-border  font-medium text-[8px] cursor:text-foreground bg-white text-foreground px-4 py-1 ${errors[name] ? "border-destructive" : ""} ${focusedInput === name ? "border-primary" : ""} `}
                                style={{ fontSize: 14 }}
                                placeholder={placeholder ? placeholder : ""}

                            />
                            {errors[name] && <Text className="dark:text-destructive text-destructive pt-1">{errors[name].message}</Text>}
                        </View>
                    )}
                />
            );
        case 'select':
            return (
                <Controller
                    name={name}
                    control={control}
                    render={({ field: { value } }) => (
                        <View className="pb-2">
                            <Text variant="body" className='font-medium pb-3'>{displayName}</Text>
                            <DynamicSelect
                                isFocused={focusedInput === name}
                                onOpenChange={(value) => handleOpenChange(value, name)}
                                options={options.options || []}
                                value={value}
                                onValueChange={(option) => handleChangeOption(name, option)}
                                label={displayName}
                            />
                            {errors[name] && <Text className="dark:text-destructive text-destructive pt-1">{errors[name].message}</Text>}
                        </View>
                    )}
                />
            )

        case 'image':
            return (
                <View className='pb-1'>
                    <Text variant="body" className='font-medium pb-3'>{displayName}</Text>
                    <ImageUpload
                        name={name}
                        control={control}
                        label={displayName}
                        errors={errors}
                        clearErrors={clearErrors}
                        setError={setError}

                    />
                </View>
            );
        case 'date':
            return (
                <Controller
                    name={name}
                    control={control}
                    render={({ field: { onChange, value, onBlur } }) => (
                        <View className='pb-4'>
                            <Text variant="body" className='font-medium pb-3'>{displayName}</Text>
                            <Input
                                // {...field}
                                placeholder={"DD/MM/YYYY"}
                                onChangeText={onChange}
                                onFocus={() => handleFocus(name)}
                                onBlur={() => setFocusedInput(undefined)}
                                value={value}
                                keyboardType="numeric"
                                maxLength={10}
                                className={`h-12 border-2 font-medium text-[8px] cursor:text-foreground bg-white text-foreground px-4 py-1 ${errors[name] ? "border-destructive" : ""} ${focusedInput === name ? "border-primary" : ""}`}
                                // aria-labelledby={`${field.name}`}
                                // aria-errormessage={`${field.name} validation error`}
                                style={{ fontSize: 14 }} />
                            {errors[name] && <Text className="dark:text-destructive text-destructive pt-1">{errors[name].message}</Text>}
                        </View>


                    )}
                />
            );

        default:
            return null;
    }
}

export default DynamicFieldComponent
