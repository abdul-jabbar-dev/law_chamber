"use client";

import Image from 'next/image';
import { useAppointmentModal } from "@/src/context/AppointmentContext";

const Hero = () => {
    const { openAppointmentModal } = useAppointmentModal();

    return (
        <section className="relative w-full h-150.5 flex items-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 bg-gray-900">
                <Image
                    src="/img/image.png"
                    alt="Hero Background"
                    fill
                    sizes="100vw"
                    priority
                    className="object-cover z-0"
                    style={{ objectPosition: 'center 60%' }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/5 z-10"></div>
            </div>

            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                        Your Legal Solutions,<br />Our Professionalism
                    </h1>
                    <p className="text-xl text-gray-200 mb-8">
                        A team of experienced lawyers, by your side at every step.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={openAppointmentModal}
                            className="bg-[#A07D5A] hover:bg-[#8c6b49] text-white px-8 py-3 rounded font-medium transition-colors border border-[#A07D5A] cursor-pointer"
                        >
                            Book Free Appointment
                        </button>
                        
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
