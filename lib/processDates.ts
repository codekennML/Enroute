import { addMonths, isAfter, parse, parseISO, isValid } from 'date-fns'



export const processDates = (watchedValues, dateFieldPairs, setError, errors) => {

    for (const { issue, expiry } of dateFieldPairs) {

        const issueDateStr = watchedValues[issue];
        const expiryDateStr = watchedValues[expiry];


        // Skip if expiry date is already showing an error (avoid overriding an existing error)
        console.log("Molan", issueDateStr)


        if (!issueDateStr) continue

        const issueDate = parse(issueDateStr, 'dd/MM/yyyy', new Date());
        const today = new Date(Date.now())

        console.log("Slanlan")


        if (!errors[issue]?.message && isValid(issueDate) && issueDate.getTime() > today.getTime()) {

            setError(issue, {
                message: `Issue date cannot be in the future`,
                type: "random"
            })

            // continue
        }
        console.log("Miranan")

        if (expiryDateStr && errors[expiry]?.message) continue;

        // If there's no expiry date, skip further validation
        if (!expiryDateStr) continue;
        console.log("MolYYYYY")
        // Parse dates using the appropriate format (dd/MM/yyyy)

        const expiryDate = parse(expiryDateStr, 'dd/MM/yyyy', new Date());

        console.log("stdyyhsan")
        if (expiryDate && isValid(expiryDate) && !errors[expiry]?.message && expiryDate.getTime() < today.getTime()) {

            setError(expiry, {
                message: `Document is expired`,
                type: "random"
            })

        }
        console.log("776788lan")

        // Validate that both dates are valid
        if ((expiryDate && issueDate) && (!isValid(issueDate) || !isValid(expiryDate))) {
            setError(expiry, {
                message: `Invalid date format for ${expiryDateStr}. Please use DD/MM/YYYY.`,
            });
            continue;
        }

        console.log("8008999an")

        // Add 3 months to the issue date and check if expiry is after this
        const issuePlusThreeMonths = addMonths(issueDate, 3);

        if (!isAfter(expiryDate, issuePlusThreeMonths)) {
            setError(expiry, {
                message: `Expiry date must be at least 3 months after issue date.`,
            });
        }

        // else {
        //     clearErrors(expiry); // Clear any errors on the expiry field if the validation passes
        // }
    }

}
