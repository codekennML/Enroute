import { useAppDispatch } from '@/redux/hooks';
import { showToast } from '@/redux/slices/toast';
import { useState } from 'react';

export function useErrorHandling() {

    const dispatch = useAppDispatch()

    const [error, setError] = useState<{ type: string, status?: number, message?: string, title?: string, reasons?: Record<string, string> } | null>(null);

    const handleError = (error: any) => {
        console.log("Err", error)
        const status = error.response?.status || error.status || error?.data?.status || 500;
        const message = error.response?.data?.message || error?.data.message || error.message || 'An unknown error occurred';
        let reasons = error?.reasons || error?.data?.reason

        let type = 'Unknown';
        if (status >= 500) {
            type = 'ServerError';
            dispatch(showToast({
                message: "Something went wrong. Please try again.",
                notification: "danger",
                type: "foreground",
                title: "Internal error"
            }))
        } else if (status === 401) {
            type = 'Unauthorized';


        } else if (status === 400) {
            type = 'ValidationError';


        }
        else if (status === 403) {

            type = "Forbidden"
            dispatch(showToast({
                message: message || "You do not have sufficient permission to perform his action.",
                notification: "danger",
                type: "foreground",
                title: "Internal error"
            }))

        }
        else if (status === 404) {

            type = "NotFound"
            dispatch(showToast({
                message: "You do not have sufficient permission to perform his action.",
                notification: "danger",
                type: "foreground",
                title: " "
            }))

        }
        else if (status === 409) {
            type = ""
            dispatch(showToast({
                message: "Another record  was found with the received data.Please check your request and try again ",
                notification: "warning",
                type: "foreground",
                title: ""
            }))
        }

        else if (status === 429) {
            type = ""
            dispatch(showToast({
                message: "Too many requests. Please try again after some time.",
                notification: "warning",
                type: "foreground",
                title: ""
            }))
        }

        setError({ type, status, message });
    };

    return { error, handleError };
}


export function useWrappedErrorHandling() {
    const { error, handleError } = useErrorHandling();

    // Function to wrap any function with error handling
    const wrapWithHandling = <T extends (...args: any[]) => any>(fn: T) => {
        return withErrorHandling(fn, handleError);
    };

    return { error, handleError, wrapWithHandling };
}

// General-purpose error handling wrapper for functions
export function withErrorHandling<T>(fn: (...args: any[]) => T | Promise<T>, errorHandler: (error: any) => void) {
    return async (...args: any[]): Promise<T | null> => {
        try {
            return await fn(...args);
        } catch (error) {
            errorHandler(error);
            return null;
        }
    };
}
