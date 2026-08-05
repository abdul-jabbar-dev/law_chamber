"use client";

import { useAppointmentModal } from "@/src/context/AppointmentContext";

export default function ConsultCalloutClient() {
    const { openAppointmentModal } = useAppointmentModal();

    return (
        <div className="bg-[#1E1B18] text-white p-6 rounded-xl border border-gray-800 text-center space-y-4">
            <h4 className="text-lg font-bold text-white">Need Legal Guidance?</h4>
            <p className="text-xs text-gray-300 font-sans leading-relaxed">
                Schedule a direct confidential consultation with our attorneys to discuss your case details.
            </p>
            <button
                onClick={openAppointmentModal}
                className="block w-full bg-[#A07D5A] hover:bg-[#866645] text-white text-xs font-semibold py-3 rounded transition-colors uppercase tracking-wider font-sans"
            >
                Book Appointment
            </button>
        </div>
    );
}
