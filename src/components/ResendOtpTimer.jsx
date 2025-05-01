import { useState, useEffect } from "react";

const ResendOtpTimer = ({ initialTime = 60, onTimerEnd }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        if (timeLeft <= 0) {
            onTimerEnd(); // Notify parent when timer ends
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer); // Cleanup timer on unmount
    }, [timeLeft, onTimerEnd]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    return <div>Resend OTP in {formatTime(timeLeft)}</div>;
};

export default ResendOtpTimer;

