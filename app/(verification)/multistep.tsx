// import React, { useState } from 'react';
// import { useForm, FormProvider, useWatch } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import PersonalInfoStep from './personalInfo';
// import EmergencyContactStep from './emergency';
// import { Button } from '@/components/ui/button';
// import { Text } from '@/components/ui/text';
// import { ScrollView, View } from 'react-native';
// import AvatarStep from './avatar';
// import IdentityVerificationStep from './dynamic';
// import ImageUpload from '@/components/ui/imageUpload';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import schemas from './schemas';

export type DynamicField = {
  id: number | string
  name: string;
  displayName: string;
  options: {
    type: string;
    options?: string[];
    schemaType: string;
    optional?: boolean
  };
};





// // Define the structure of our multi-step form
// const formSteps = [
//   { title: "Photo Verification", Component: AvatarStep },
//   { title: "Personal Information", Component: PersonalInfoStep },
//   { title: "Emergency Contact", Component: EmergencyContactStep },
//   // { title: "Identity", Component: IdentityVerificationStep }
//   // { title: "State Verification", Component: GeoVerificationStep },
//   // Add more steps as needed
// ];


// function MultiStepForm({ dynamicFields }: { dynamicFields: DynamicField[] }) {
//   const [currentStep, setCurrentStep] = useState(0);
//   // const schema = createFormSchema(dynamicFields);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // console.log(schema?.shape)
//   const methods = useForm({
//     resolver: zodResolver(schemas[currentStep]),
//     mode: "onChange"
//   });


//   const watchedValues = useWatch({
//     control: methods.control,
//     name: ["avatar"], // Add the names of fields you want to watch
//   });


//   const isCurrentStepValid = () => {

//     console.log(watchedValues)
//     if (currentStep === 1 && !watchedValues?.avatar) {
//       return false
//     }

//     return true

//   }



//   const onSubmit = async (data: any) => {

//     console.log(data)
//     if (currentStep < formSteps.length - 1) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       setIsSubmitting(true);
//       try {
//         // Replace this with your actual submission logic
//         await new Promise(resolve => setTimeout(resolve, 1000));
//         console.log('Form submitted:', data);
//         // Handle successful submission (e.g., show success message, navigate away)
//       } catch (error) {
//         console.error('Submission error:', error);
//         // Handle submission error (e.g., show error message)
//       } finally {
//         setIsSubmitting(false);
//       }
//     // }
//   };

//   console.log(currentStep)
//   const CurrentStepComponent = formSteps[currentStep].Component;

//   return (
//     <FormProvider {...methods}>
//       {/* <ScrollView contentContainerStyle={{ flexGrow: 1 }}> */}
//       <SafeAreaView>

//         <View className='flex-col h-full justify-between'>
//           <View className='flex-1 mt-6 px-6'>
//             <Text className='text-[22px] font-semibold text-center'>{formSteps[currentStep].title} </Text>
//             <CurrentStepComponent
//             // dynamicFields={currentStep === 3 ? dynamicFields : []

//             // }
//             />
//           </View>

//           <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 2 }} className='px-4 pb-6'>
//             {currentStep > 0 && (
//               <Button variant={"ghost"} size={"lg"} rounded="base" onPress={() => setCurrentStep(currentStep - 1)} disabled={isSubmitting} className='flex-1 flex-row items-center justify-center bg-accent'>
//                 <Text variant={"smallTitle"}>
//                   Previous
//                 </Text>
//               </Button>
//             )}
//             {


//               isCurrentStepValid() && <Button size={"lg"} variant={"default"} rounded="base" onPress={methods.handleSubmit(onSubmit)} disabled={isSubmitting} className='flex-1 flex-row items-center justify-center'>
//                 <Text variant={"smallTitle"}>

//                   {isSubmitting
//                     ? 'Submitting...'
//                     : currentStep === formSteps.length - 1
//                       ? 'Submit'
//                       : 'Next'
//                   }

//                 </Text>
//               </Button>
//             }
//           </View>
//         </View>

//       </SafeAreaView>

//     </FormProvider>
//   )
// }

// export default MultiStepForm