"use client";

import { useAppointmentModal } from "@/src/context/AppointmentContext";

interface BookAppointmentBtnProps {
    className?: string;
    text?: string;
    onClick?: () => void;
}

export default function BookAppointmentBtn({ className, text = "Book Appointment", onClick }: BookAppointmentBtnProps) {
    const { openAppointmentModal } = useAppointmentModal();

    const handleClick = () => {
        openAppointmentModal();
        if (onClick) onClick();
    };

    return (
        <button
            onClick={handleClick}
            className={className || "bg-[#A07D5A] hover:bg-[#866645] text-white text-xs sm:text-sm font-semibold py-3 px-6 rounded-lg transition-colors font-sans uppercase tracking-wider shadow-sm"}
        >
            {text}
        </button>
    );
}
