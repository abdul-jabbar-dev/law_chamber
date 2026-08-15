"use client";

import Link from 'next/link';
import { useAppointmentModal } from "@/src/context/AppointmentContext";

const CTA = () => {
    const { openAppointmentModal } = useAppointmentModal();

    return (
        <section className="py-20 bg-[#A07D5A] text-white text-center">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold mb-6">Need Free Consultation?</h2>
                <p className="text-lg mb-8 text-white/90">
                    Looking for expert legal advice? Connect with our dedicated team today for a confidential discussion about your specific legal matters.
                </p>
                <div className="flex justify-center gap-4">
                    
                    <button
                        onClick={openAppointmentModal}
                        className="bg-transparent border border-white text-white hover:bg-white/10 px-8 py-3 rounded font-medium transition-colors cursor-pointer"
                    >
                        Take Free Consultation
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CTA;
