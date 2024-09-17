import { DynamicField } from "@/app/verification/multistep";

export const canProceed = (errors, watchedValues, dynamicFields: DynamicField[]) => {

    const hasErrors = Object.keys(errors).length > 0;

    console.log(hasErrors, "HASERRORS")

    const requiredFields = dynamicFields
        .filter(field => field.options.required)
        .map(field => field.name);

    console.log(requiredFields, "REQUIRED FILEDS")

    // Check if all required fields in watchedValues are filled
    const allFieldsFilled = requiredFields.every(field =>
        watchedValues[field] !== undefined &&
        watchedValues[field] !== '' &&
        watchedValues[field] !== null
    );

    console.log(allFieldsFilled, "ALLLFRIELDS")


    return !hasErrors && allFieldsFilled
}