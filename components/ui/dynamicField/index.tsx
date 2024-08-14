
import { DynamicField } from "@/app/rider/(verification)/multistep";
import { Controller } from "react-hook-form";
import { View } from "react-native";
import ImageUpload from "../imageUpload";
import { Input } from "../input";
import DynamicSelect from "../select/dynamic";
import { Text } from "../text"

export interface ControllerProps {
    field: DynamicField,
    control: any,
    errors: any
}


const DynamicFieldComponent: React.FC<ControllerProps> = ({ field, control, errors }: any) => {

    const { name, displayName, options, placeholder } = field;

    switch (options.type) {
        case 'text':
        case "number":
            return (
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <View className="pb-4">
                            <Text variant="body" className='font-medium pb-3'>{displayName}</Text>
                            <Input
                                {...field}
                                inputMode={options.type === "number" ? "numeric" : undefined}
                                className={`h-12 border-2 font-medium text-[8px] cursor:text-foreground bg-white text-muted-foreground px-4 py-1 ${errors[name] ? "border-red-600" : 'border-border'}`}
                                aria-labelledby={`${field.name}`}
                                aria-errormessage={`${field.name} validation error`}
                                style={{ fontSize: 14 }}
                                placeholder={placeholder ? placeholder : ""}

                            />
                            {errors[name] && <Text>{errors[name].message}</Text>}
                        </View>
                    )}
                />
            );
        case 'select':
            return (
                <Controller
                    name={name}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <View className="pb-4">
                            <Text variant="body" className='font-medium pb-3'>{displayName}</Text>
                            <DynamicSelect
                                options={options.options || []}
                                value={value}
                                onValueChange={onChange}
                                label={displayName}
                            />
                            {errors[name] && <Text>{errors[name].message}</Text>}
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
                    />
                </View>
            );
        case 'date':
            return (
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (

                        <View className='pb-4'>

                            <Text variant="body" className='font-medium pb-3'>{displayName}</Text>
                            <Input {...field} placeholder={"DD/MM/YYYY"} className={`h-12 border-2 font-medium text-[8px] cursor:text-foreground bg-white text-muted-foreground px-4 py-1 ${errors[name] ? "border-red-600" : 'border-border'}`}
                                aria-labelledby={`${field.name}`}
                                aria-errormessage={`${field.name} validation error`}
                                style={{ fontSize: 14 }} />
                            {errors[name] && <Text>{errors[name].message}</Text>}
                        </View>
                        // {errors[name] && <Text>{errors[name].message}</Text>}

                    )}
                />
            );
        default:
            return null;
    }
}

export default DynamicFieldComponent
