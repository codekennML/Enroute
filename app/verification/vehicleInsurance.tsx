import Back from "@/components/ui/back"
import { View, ScrollView, SafeAreaView } from "react-native"
import { Text } from "@/components/ui/text"
import { useForm } from "react-hook-form"
import DynamicFieldComponent from "@/components/ui/dynamicField"
import { Button } from "@/components/ui/button"
import { router } from "expo-router"

const vehicleInsuranceDocs = [
    {
        id: "insurance_provider",
        name: "insurance_provider",
        displayName: "Insurance Provider ",
        placeholder: "",
        options: {
            type: "text",
            schemaType: "string"
        }
    },

    {
        id: "insurance_id",
        name: "insurance_id",
        displayName: "Insurance ID ",
        placeholder: "",
        options: {
            type: "text",
            schemaType: "string"
        }
    },

    {
        id: "insurance_issue_date",
        name: "insurance_issue_date",
        displayName: "Insurance Issue Date",
        placeholder: "DD/MM/YYY",
        options: {
            type: "text",
            schemaType: "date"
        }
    },

    {
        id: "insurance_expiry_date",
        name: "insurance_expiry_date",
        displayName: "Insurance Expiry Date ",
        placeholder: "DD/MM/YYY",
        options: {
            type: "text",
            schemaType: "date"
        }

    }


]


const vehicleInsurance = () => {
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

    const handleSubmitInsurance = () => {
        router.push({
            pathname: "/verification/processing"
        })
    }

    return (
        <SafeAreaView>
            <View className="px-6  h-full justify-between ">
                <View className='flex-1'>
                    <View className='mt-4'>
                        <Back iconType='arrow' iconSize={30} />
                        <Text className='text-[24px] font-semibold text-foreground pb-5 '>Vehicle Insurance</Text>
                    </View>
                    <ScrollView scrollEnabled={true} horizontal={false} showsVerticalScrollIndicator={false}>
                        <View className='flex flex-col gap-y-1'>

                            {vehicleInsuranceDocs.map((field) => (
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
                    <Button size={"lg"} rounded="base" className='flex-row items-center justify-center' variant={"default"} disabled={hasErrors || !!allFieldsFilled} onPress={handleSubmitInsurance}>
                        <Text variant={"smallTitle"} className='font-semibold'>Submit</Text>
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default vehicleInsurance