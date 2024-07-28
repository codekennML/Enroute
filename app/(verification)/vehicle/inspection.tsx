import Back from "@/components/ui/back"
import { useForm } from "react-hook-form";
import { View, ScrollView, SafeAreaView } from "react-native"
import { Text } from "@/components/ui/text"
import DynamicFieldComponent from "@/components/ui/dynamicField";
import { Button } from "@/components/ui/button";
import { router } from "expo-router";

const vehicleInspectionDocs = [
    {
        id: "inspection_provider",
        name: "inspection_provider",
        displayName: "Inspection Provider",
        placeholder: "Mallanz Vehicle Inspection Limited",
        options: {
            type: "text",
            schemaType: "string"
        }
    },
    {
        id: "inspection_issue_date",
        name: "inspection_issue_date",
        displayName: "Issue Date",
        placeholder: "DD/MM/YYY",
        options: {
            type: "text",

            schemaType: "date"
        }
    },
    {
        id: "inspection_expiry_date",
        name: "inspection_expiry_date",
        displayName: "Issue Date",
        placeholder: "DD/MM/YYY",
        options: {
            type: "text",

            schemaType: "date"
        }

    },

    {
        id: "inspection_image",
        name: "inspection_image",
        displayName: "Inspection Report Image",
        placeholder: "DD/MM/YYY",
        options: {
            type: "image",
            schemaType: "string"
        }
    }

]


const vehicleInspection = () => {
    const { control, watch, formState: { errors } } = useForm({

    })


    const hasErrors = Object.keys(errors).length > 0;
    // Watch all the values in the form
    const watchedValues = watch();

    // Check if all required fields have values


    // useEffect(() => {

    //     console.log(allFieldsFilled)
    //     if (allFieldsFilled) setValuesComplete(true)
    // }, [watchedValues])

    const allFieldsFilled = Object.values(watchedValues).every(Boolean);
    console.log(watchedValues)

    const handleSubmitInspection = () => {
        router.push({
            pathname: "/(verification)/vehicle/insurance"
        })
    }


    return (
        <SafeAreaView>
            <View className="px-6  h-full justify-between ">
                <View className='flex-1'>
                    <View className='mt-[10%]'>
                        <Back />
                        <Text className='text-[24px] font-semibold text-foreground pb-5 text-center'>Vehicle Inspection </Text>
                    </View>
                    <ScrollView scrollEnabled={true} horizontal={false} showsVerticalScrollIndicator={false}>
                        <View className='flex flex-col gap-y-3'>

                            {vehicleInspectionDocs.map((field) => (
                                <DynamicFieldComponent
                                    key={field.id}
                                    field={field}
                                    control={control}
                                    errors={errors}
                                />
                            ))}
                        </View>
                    </ScrollView>
                </View>
                <View className=' bg-white w-full pb-4'>
                    <Button size={"lg"} rounded="base" className='flex-row items-center justify-center' variant={"default"} disabled={hasErrors || !!allFieldsFilled} onPress={handleSubmitInspection}>
                        <Text variant={"smallTitle"} className='font-semibold'>Continue</Text>
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default vehicleInspection