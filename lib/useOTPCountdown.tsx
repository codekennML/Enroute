import { useState, useEffect, FC } from 'react';

export const useOtpCountdown = (value: number) => {
    const [countdown, setCountdown] = useState(0); // Start with 0 so resend is available immediately

    const startCountdown = () => {
        setCountdown(value); // Set to 30 seconds when OTP is sent
    };

    useEffect(() => {
        if (countdown > 0) {
            const timerId = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);

            return () => clearInterval(timerId); // Clean up the interval
        }
    }, [countdown]);

    return {
        countdown,
        startCountdown,
    };
};

