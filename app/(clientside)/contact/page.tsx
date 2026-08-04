"use client";

import { useState } from "react";
import Image from "next/image";
import { User, Mail, Phone, Scale, Pencil, MapPin, MessageSquare, ChevronDown, Clock, ShieldCheck } from "lucide-react";
import { useAppointmentModal } from "@/src/context/AppointmentContext";
import { CHAMBER_CONTACT_INFO, getWhatsAppMessageLink } from "@/src/constants/contactInfo";

export default function ContactPage() {
    const { openAppointmentModal } = useAppointmentModal();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        practiceArea: "Corporate",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Thank you for reaching out. Senior ${CHAMBER_CONTACT_INFO.lawyerName}'s team will contact you shortly.`);
    };

    return (
        <div className="w-full min-h-screen bg-[#FAFAFA] flex flex-col text-gray-900 font-serif">
            {/* Top Contact Form & Office Info Section */}
            <section className="w-full relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
                {/* Background Marble Texture */}
                <div
                    className="absolute inset-0 z-0 opacity-65 pointer-events-none"
                    style={{ backgroundImage: "url('/bg/texture.png')", backgroundSize: "cover", backgroundPosition: "30% 50%" }}
                ></div>

                <div className="relative z-10 max-w-6xl mx-auto flex flex-col">
                    {/* Page Header */}
                    <div className="mb-16 text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1A1A1A] mb-4 tracking-wider uppercase">
                            Connect With Our Legal Experts
                        </h1>
                        <div className="w-24 h-0.5 bg-[#A07D5A] mx-auto mb-6"></div>
                        <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed font-sans">
                            Schedule a confidential consultation. {CHAMBER_CONTACT_INFO.firmName} is ready to provide strategic guidance tailored to your needs.
                        </p>
                    </div>

                    {/* Form & Info Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
                        
                        {/* LEFT COLUMN: Formal Contact Form */}
                        <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-xl border border-gray-100 shadow-md flex flex-col justify-between font-sans">
                            <div>
                                <div className="mb-6 pb-4 border-b border-gray-100 flex items-center justify-between">
                                    <h2 className="text-xl font-semibold text-[#1A1A1A] uppercase tracking-wide font-serif">
                                        Send A Message
                                    </h2>
                                    <div className="flex items-center gap-1.5 text-xs text-[#A07D5A] font-medium">
                                        <ShieldCheck className="w-4 h-4" />
                                        <span>Confidential & Secure</span>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Full Name */}
                                    <div className="relative flex items-center bg-white rounded-lg border border-gray-200 shadow-2xs px-4 py-3.5 focus-within:border-[#A07D5A] focus-within:ring-1 focus-within:ring-[#A07D5A] transition-all">
                                        <User className="text-[#A07D5A] w-5 h-5 mr-3 shrink-0" />
                                        <input
                                            type="text"
                                            placeholder="Full Name *"
                                            required
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            className="w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-500 text-sm font-medium"
                                        />
                                    </div>

                                    {/* Email Address */}
                                    <div className="relative flex items-center bg-white rounded-lg border border-gray-200 shadow-2xs px-4 py-3.5 focus-within:border-[#A07D5A] focus-within:ring-1 focus-within:ring-[#A07D5A] transition-all">
                                        <Mail className="text-[#A07D5A] w-5 h-5 mr-3 shrink-0" />
                                        <input
                                            type="email"
                                            placeholder="Email Address *"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-500 text-sm font-medium"
                                        />
                                    </div>

                                    {/* Phone Number */}
                                    <div className="relative flex items-center bg-white rounded-lg border border-gray-200 shadow-2xs px-4 py-3.5 focus-within:border-[#A07D5A] focus-within:ring-1 focus-within:ring-[#A07D5A] transition-all">
                                        <Phone className="text-[#A07D5A] w-5 h-5 mr-3 shrink-0" />
                                        <input
                                            type="tel"
                                            placeholder="Phone Number *"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-500 text-sm font-medium"
                                        />
                                    </div>

                                    {/* Practice Area of Interest */}
                                    <div className="relative flex items-center bg-white rounded-lg border border-gray-200 shadow-2xs px-4 py-3.5 focus-within:border-[#A07D5A] focus-within:ring-1 focus-within:ring-[#A07D5A] transition-all">
                                        <Scale className="text-[#A07D5A] w-5 h-5 mr-3 shrink-0" />
                                        <select
                                            value={formData.practiceArea}
                                            onChange={(e) => setFormData({ ...formData, practiceArea: e.target.value })}
                                            className="w-full bg-transparent outline-none text-gray-900 text-sm font-medium appearance-none cursor-pointer pr-8"
                                        >
                                            <option value="Corporate">Corporate Litigation & Business</option>
                                            <option value="Real Estate">Real Estate & Property Law</option>
                                            <option value="Criminal">Criminal Defense & Investigation</option>
                                            <option value="Legendarily">Administrative & Regulatory Appeals</option>
                                            <option value="Other Advises">General Legal Advisory</option>
                                        </select>
                                        <ChevronDown className="text-gray-400 w-4 h-4 absolute right-4 pointer-events-none" />
                                    </div>

                                    {/* Message */}
                                    <div className="relative flex items-start bg-white rounded-lg border border-gray-200 shadow-2xs px-4 py-3.5 focus-within:border-[#A07D5A] focus-within:ring-1 focus-within:ring-[#A07D5A] transition-all">
                                        <Pencil className="text-[#A07D5A] w-5 h-5 mr-3 mt-1 shrink-0" />
                                        <textarea
                                            placeholder="Briefly describe your legal inquiry *"
                                            rows={4}
                                            required
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-500 text-sm font-medium resize-none"
                                        ></textarea>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="w-full bg-[#A07D5A] hover:bg-[#866645] text-white font-medium py-3.5 rounded text-xs uppercase tracking-widest transition-colors shadow-sm cursor-pointer mt-2"
                                    >
                                        SEND MESSAGE
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Formal Office Information Card */}
                        <div className="lg:col-span-5 relative rounded-xl shadow-md overflow-hidden text-white p-8 md:p-10 flex flex-col justify-between bg-[#1A1816] border border-gray-800 font-sans">
                            {/* Background Image Overlay */}
                            <Image
                                src="/img/image.png"
                                alt="Office Background"
                                fill
                                className="object-cover opacity-20 mix-blend-overlay"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-[#1A1816]/90 via-[#1A1816]/85 to-[#1A1816]/95 z-0"></div>

                            <div className="relative z-10">
                                {/* Header */}
                                <div className="mb-8 border-b border-white/10 pb-6">
                                    <h3 className="text-2xl font-semibold text-[#D4B595] uppercase tracking-wide font-serif">
                                        Our Office Information
                                    </h3>
                                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                                        Visit our chambers or contact our team directly during business hours.
                                    </p>
                                </div>

                                {/* Information Items */}
                                <div className="space-y-6">
                                    {/* Office Address */}
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-[#A07D5A]/20 border border-[#A07D5A]/30 flex items-center justify-center shrink-0">
                                            <MapPin className="w-5 h-5 text-[#D4B595]" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs uppercase font-bold tracking-widest text-[#D4B595]">Office Address</h4>
                                            <p className="text-sm text-gray-200 leading-relaxed mt-1">
                                                {CHAMBER_CONTACT_INFO.address}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Phone Number Direct */}
                                    <a href={`tel:${CHAMBER_CONTACT_INFO.phoneRaw}`} className="flex items-start gap-4 group cursor-pointer">
                                        <div className="w-10 h-10 rounded-lg bg-[#A07D5A]/20 border border-[#A07D5A]/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                            <Phone className="w-5 h-5 text-[#D4B595]" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs uppercase font-bold tracking-widest text-[#D4B595]">Direct Phone</h4>
                                            <p className="text-sm font-semibold text-white tracking-wider mt-1 group-hover:underline">
                                                {CHAMBER_CONTACT_INFO.phone}
                                            </p>
                                        </div>
                                    </a>

                                    {/* WhatsApp Link Direct */}
                                    <a
                                        href={getWhatsAppMessageLink()}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-start gap-4 group cursor-pointer"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                            <MessageSquare className="w-5 h-5 text-emerald-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs uppercase font-bold tracking-widest text-emerald-400">WhatsApp Direct</h4>
                                            <p className="text-sm font-semibold text-emerald-300 tracking-wider mt-1 group-hover:underline">
                                                {CHAMBER_CONTACT_INFO.whatsapp} (Click to Chat)
                                            </p>
                                        </div>
                                    </a>

                                    {/* Consultation Hours */}
                                    <div className="flex items-start gap-4 pt-4 border-t border-white/10">
                                        <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                            <Clock className="w-5 h-5 text-gray-300" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs uppercase font-bold tracking-widest text-gray-400">Chamber Hours</h4>
                                            <p className="text-xs text-gray-300 mt-1">
                                                {CHAMBER_CONTACT_INFO.chamberHours}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Office Interior Banner Section */}
            <section className="w-full relative h-[320px] md:h-[400px] overflow-hidden border-b border-gray-200">
                <Image
                    src="/img/image.png"
                    alt="Law Chamber Interiors"
                    fill
                    className="object-cover"
                />
            </section>

            {/* Google Map Section with Center-Left Detailed Location Overlay */}
            <section className="w-full relative h-[450px] md:h-[520px] overflow-hidden border-b border-gray-200">
                {/* Center-Left Detailed Overlay Card */}
                <div className="absolute top-1/2 left-6 sm:left-12 md:left-16 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-md p-6 sm:p-7 rounded-2xl shadow-2xl border border-gray-200/80 w-[90%] max-w-sm sm:max-w-md text-left flex flex-col items-start font-serif">
                    {/* Header with Red Map Pin Badge */}
                    <div className="flex items-center gap-3.5 mb-4 w-full border-b border-gray-100 pb-3 font-sans">
                        <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center shrink-0">
                            <MapPin className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                            <span className="text-[10px] font-bold tracking-widest text-[#A07D5A] uppercase block">
                                Main Chamber Location
                            </span>
                            <h3 className="text-base font-bold text-gray-900 leading-tight font-serif">
                                {CHAMBER_CONTACT_INFO.firmName}
                            </h3>
                        </div>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 font-sans">
                        {CHAMBER_CONTACT_INFO.address}
                    </p>

                    {/* Detailed Metadata Grid */}
                    <div className="w-full grid grid-cols-2 gap-3 text-left mb-5 font-sans">
                        <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Chamber Hours</span>
                            <span className="text-xs font-semibold text-gray-800">{CHAMBER_CONTACT_INFO.chamberHours}</span>
                        </div>
                        <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Direct Line</span>
                            <span className="text-xs font-semibold text-gray-800">{CHAMBER_CONTACT_INFO.phone}</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 w-full font-sans">
                        <a
                            href={CHAMBER_CONTACT_INFO.mapNavigationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-[#A07D5A] hover:bg-[#866645] text-white text-xs font-semibold py-2.5 px-4 rounded-lg transition-colors shadow-xs text-center"
                        >
                            Get Directions
                        </a>
                        <a
                            href={`tel:${CHAMBER_CONTACT_INFO.phoneRaw}`}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold py-2.5 px-4 rounded-lg transition-colors border border-gray-200 text-center"
                        >
                            Call Chamber
                        </a>
                    </div>
                </div>

                <iframe
                    title="Law Chamber Main Office Location"
                    src={CHAMBER_CONTACT_INFO.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                ></iframe>
            </section>

            {/* Formal Call to Action */}
            <section className="w-full bg-[#8B6B4C] py-16 px-4 sm:px-6 text-center text-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 tracking-wide">
                        Ready to Discuss Your Legal Matters?
                    </h2>
                    <p className="text-xs md:text-sm text-gray-200 mb-8 max-w-xl mx-auto font-sans">
                        Don&apos;t leave your legal matters to chance. Partner with Senior {CHAMBER_CONTACT_INFO.lawyerName} and a team that knows how to win.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 font-sans">
                        <a
                            href={`tel:${CHAMBER_CONTACT_INFO.phoneRaw}`}
                            className="w-full sm:w-auto px-8 py-3.5 border border-white text-white hover:bg-white hover:text-[#8B6B4C] transition-colors rounded text-xs uppercase tracking-widest font-medium"
                        >
                            Call Now
                        </a>
                        <button
                            onClick={openAppointmentModal}
                            className="w-full sm:w-auto px-8 py-3.5 border border-white text-white hover:bg-white hover:text-[#8B6B4C] transition-colors rounded text-xs uppercase tracking-widest font-medium cursor-pointer"
                        >
                            Book Appointment
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
