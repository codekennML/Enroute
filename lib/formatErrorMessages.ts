function formatErrorMessage(value: string): string {
    // Capitalize the first letter
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);

    // Convert camelCase to readable format
    const readableValue = capitalizedValue.replace(/([a-z0-9])([A-Z])/g, '$1 $2');

    return readableValue;
}

export default formatErrorMessage