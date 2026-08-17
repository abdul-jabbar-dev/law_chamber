"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { User, Mail, Phone, Scale, Pencil, MapPin, MessageSquare, ChevronDown, Clock, ShieldCheck } from "lucide-react";
import { useAppointmentModal } from "@/src/context/AppointmentContext";
import { getWhatsAppMessageLink } from "@/src/constants/contactInfo";
import ChamberInfo from "@/src/components/home/ChamberInfo";

export default function ContactPage() {
    const { openAppointmentModal } = useAppointmentModal();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        practiceArea: "Corporate",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
    const [settings, setSettings] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.PUBLIC_API_URL || 'http://localhost:5000/api'}/settings`)
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) {
                    setSettings(data.data);
                }
            })
            .catch(err => console.error("Error fetching settings:", err))
            .finally(() => setIsLoading(false));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus("idle");

        const url = `https://api.callmebot.com/whatsapp.php?phone=${settings?.officeInfo?.whatsappNumber}&text=New+Message+from+${formData.fullName}&apikey=YOUR_API_KEY`;
        await fetch(url);
        try {
            const res = await fetch(`${process.env.PUBLIC_API_URL || 'http://localhost:5000/api'}/inquiries`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (data.success) {
                setSubmitStatus("success");
                setFormData({
                    fullName: "",
                    email: "",
                    phone: "",
                    practiceArea: "Corporate",
                    message: "",
                });
            } else {
                setSubmitStatus("error");
            }
        } catch (error) {
            console.error("Error submitting inquiry:", error);
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#FAFAFA] flex flex-col text-gray-900 font-serif">
            {isLoading ? (
                <div className="flex-1 flex justify-center items-center">
                    <div className="w-8 h-8 border-4 border-[#A07D5A] border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <>
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
                                    Schedule a confidential consultation. {settings?.chamberInfo?.firmName || 'Our Firm'} is ready to provide strategic guidance tailored to your needs.
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
                                                disabled={isSubmitting}
                                                className="w-full bg-[#A07D5A] hover:bg-[#866645] text-white font-medium py-3.5 rounded text-xs uppercase tracking-widest transition-colors shadow-sm cursor-pointer mt-2 disabled:opacity-70 flex justify-center items-center"
                                            >
                                                {isSubmitting ? (
                                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                                ) : "SEND MESSAGE"}
                                            </button>

                                            {submitStatus === "success" && (
                                                <div className="p-4 mt-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-medium">
                                                    Thank you for reaching out. Senior {settings?.chamberInfo?.lawyerName || 'Advocate'}'s team will contact you shortly.
                                                </div>
                                            )}
                                            {submitStatus === "error" && (
                                                <div className="p-4 mt-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium">
                                                    There was an error sending your message. Please try again later.
                                                </div>
                                            )}
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
                                                        {settings?.officeInfo?.chamberLocation}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Phone Number Direct */}
                                            <a href={`tel:${settings?.officeInfo?.phoneNumber?.replace(/[^\d+]/g, '')}`} className="flex items-start gap-4 group cursor-pointer">
                                                <div className="w-10 h-10 rounded-lg bg-[#A07D5A]/20 border border-[#A07D5A]/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                                    <Phone className="w-5 h-5 text-[#D4B595]" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xs uppercase font-bold tracking-widest text-[#D4B595]">Direct Phone</h4>
                                                    <p className="text-sm font-semibold text-white tracking-wider mt-1 group-hover:underline">
                                                        {settings?.officeInfo?.phoneNumber}
                                                    </p>
                                                </div>
                                            </a>

                                            {/* WhatsApp Link Direct */}
                                            <a
                                                href={getWhatsAppMessageLink({}, settings?.officeInfo?.whatsappNumber?.replace(/\D/g, ''), settings?.chamberInfo?.lawyerName)}
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
                                                        {settings?.officeInfo?.whatsappNumber} (Click to Chat)
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
                                                        {settings?.chamberInfo?.chamberHours}
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

                    {/* Chamber Information Section */}
                    <ChamberInfo />

                    {/* Google Map Section with Center-Left Detailed Location Overlay */}
                    <section className="w-full relative h-[450px] md:h-[520px] overflow-hidden border-b border-gray-200">

                        <iframe
                            title="Law Chamber Main Office Location"
                            src={settings?.chamberInfo?.mapEmbedUrl || undefined}
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
                                Don&apos;t leave your legal matters to chance. Partner with Senior {settings?.chamberInfo?.lawyerName || 'Advocate'} and a team that knows how to win.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 font-sans">
                                <a
                                    href={`tel:${settings?.officeInfo?.phoneNumber?.replace(/[^\d+]/g, '')}`}
                                    className="w-full sm:w-auto px-8 py-3.5 border border-white text-white hover:bg-white hover:text-[#8B6B4C] transition-colors rounded text-xs uppercase tracking-widest font-medium"
                                >
                                    Direct Call
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
                </>
            )}
        </div>
    );
}
