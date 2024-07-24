import { useState, useEffect } from 'react';

// Generic type T allows useDebounce to be used with any type of value
const useDebounce = (value: string, delay: number = 500) => {

    const [debouncedValue, setDebouncedValue] = useState<string>("");

    useEffect(() => {

        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue
};

export default useDebounce;
