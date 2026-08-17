"use client";

import { useState, useEffect } from "react";
import { X, Calendar, Clock, User, Phone, Mail, Scale, MessageSquare, Building2, PhoneCall, ShieldCheck, MapPin, Navigation, ChevronDown } from "lucide-react";
import { PRACTICE_AREA_OPTIONS, TIME_SLOT_OPTIONS, getWhatsAppMessageLink, getEmailMailtoLink } from "@/src/constants/contactInfo";

interface AppointmentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        preferredDate: "",
        preferredTime: TIME_SLOT_OPTIONS[0],
        practiceArea: PRACTICE_AREA_OPTIONS[0].value,
        contactOption: "whatsapp", // "whatsapp" | "phone" | "chamber" | "email"
        notes: "",
    });

    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [settings, setSettings] = useState<any>(null);

    useEffect(() => {
        if (isOpen) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/settings`)
                .then(res => res.json())
                .then(data => {
                    if (data.success && data.data) {
                        setSettings(data.data);
                        if (data.data.timeSlots && data.data.timeSlots.length > 0) {
                            // Optionally override with settings if needed in the future
                        }
                    }
                })
                .catch(err => console.error("Error fetching settings:", err));
        }
    }, [isOpen]);

    if (!isOpen) return null;

    // Show Preferred Date, Time Slot, and Practice Area only when WhatsApp, Email, or Chamber is selected
    const showDetails = ["whatsapp", "email", "chamber"].includes(formData.contactOption);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Store appointment in DB
            await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/appointments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
        } catch (error) {
            console.error("Error saving appointment:", error);
        } finally {
            setIsSubmitting(false);
        }

        if (formData.contactOption === "whatsapp") {
            const waNumber = settings?.officeInfo?.whatsappNumber?.replace(/\D/g, '');
            window.open(getWhatsAppMessageLink(formData, waNumber, settings?.chamberInfo?.lawyerName), "_blank");
        } else if (formData.contactOption === "phone") {
            const phoneRaw = settings?.officeInfo?.phoneNumber?.replace(/[^\d+]/g, '');
            window.open(`tel:${phoneRaw}`, "_self");
        } else if (formData.contactOption === "email") {
            const email = settings?.officeInfo?.email;
            window.open(getEmailMailtoLink(formData, email, settings?.chamberInfo?.lawyerName), "_blank");
        } else if (formData.contactOption === "chamber") {
            if (settings?.officeInfo?.chamberLocation) {
                window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.officeInfo.chamberLocation)}`, "_blank");
            } else if (settings?.chamberInfo?.mapNavigationUrl) {
                window.open(settings.chamberInfo.mapNavigationUrl, "_blank");
            }
        }

        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            onClose();
            // Reset form data optionally
            setFormData(prev => ({
                ...prev,
                fullName: "",
                phone: "",
                email: "",
                notes: ""
            }));
        }, 2500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-x-hidden animate-fadeIn">
            {/* Backdrop Click */}
            <div className="absolute inset-0" onClick={onClose}></div>

            {/* Modal Container */}
            <div className="relative z-10 bg-white rounded-2xl border border-gray-100 shadow-2xl max-w-lg sm:max-w-xl w-full max-h-[90vh] overflow-y-auto overflow-x-hidden p-5 sm:p-8 font-serif">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors p-1.5 rounded-full hover:bg-gray-100 cursor-pointer"
                >
                    <X className="w-5 h-5" />
                </button>

                {submitted ? (
                    <div className="py-12 text-center flex flex-col items-center justify-center space-y-4">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                            <ShieldCheck className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">Appointment Initiated!</h3>
                        <p className="text-sm text-gray-600 font-sans max-w-md">
                            Thank you, <span className="font-semibold">{formData.fullName}</span>. {settings?.chamberInfo?.lawyerName || 'Advocate'}&apos;s team has received your request and will connect with you via <span className="font-bold uppercase text-[#A07D5A]">{formData.contactOption}</span>.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Modal Header */}
                        <div className="mb-5 border-b border-gray-100 pb-4 pr-6">
                            <span className="text-[11px] font-bold text-[#A07D5A] uppercase tracking-widest block font-sans mb-1">
                                Confidential Legal Consultation
                            </span>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                Book an Appointment
                            </h2>
                            <p className="text-xs text-gray-500 font-sans mt-0.5">
                                Direct consultation session with Senior {settings?.chamberInfo?.lawyerName || 'Advocate'}.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* SELECT PREFERRED CONTACT / CONSULTATION OPTION FIRST */}
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 font-sans">
                                    Select Consultation & Contact Option *
                                </label>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-sans">
                                    {/* Option 1: WhatsApp */}
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, contactOption: "whatsapp" })}
                                        className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl border transition-all text-center cursor-pointer min-w-0 ${formData.contactOption === "whatsapp"
                                            ? "border-emerald-600 bg-emerald-50 text-emerald-800 ring-1 ring-emerald-600"
                                            : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                                            }`}
                                    >
                                        <MessageSquare className="w-5 h-5 text-emerald-600 mb-1 shrink-0" />
                                        <span className="text-xs font-bold truncate w-full">WhatsApp</span>
                                        <span className="text-[9px] text-gray-500 truncate w-full">Direct App</span>
                                    </button>

                                    {/* Option 2: Direct Phone Call */}
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, contactOption: "phone" })}
                                        className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl border transition-all text-center cursor-pointer min-w-0 ${formData.contactOption === "phone"
                                            ? "border-[#A07D5A] bg-[#A07D5A]/10 text-[#A07D5A] ring-1 ring-[#A07D5A]"
                                            : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                                            }`}
                                    >
                                        <PhoneCall className="w-5 h-5 text-[#A07D5A] mb-1 shrink-0" />
                                        <span className="text-xs font-bold truncate w-full">Direct Call</span>
                                        <span className="text-[9px] text-gray-500 truncate w-full">Phone App</span>
                                    </button>

                                    {/* Option 3: Chamber Meeting & Map */}
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, contactOption: "chamber" })}
                                        className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl border transition-all text-center cursor-pointer min-w-0 ${formData.contactOption === "chamber"
                                            ? "border-red-600 bg-red-50 text-red-800 ring-1 ring-red-600"
                                            : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                                            }`}
                                    >
                                        <Building2 className="w-5 h-5 text-red-600 mb-1 shrink-0" />
                                        <span className="text-xs font-bold truncate w-full">Chamber</span>
                                        <span className="text-[9px] text-gray-500 truncate w-full">In-Person & Map</span>
                                    </button>

                                    {/* Option 4: Email */}
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, contactOption: "email" })}
                                        className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl border transition-all text-center cursor-pointer min-w-0 ${formData.contactOption === "email"
                                            ? "border-blue-600 bg-blue-50 text-blue-800 ring-1 ring-blue-600"
                                            : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                                            }`}
                                    >
                                        <Mail className="w-5 h-5 text-blue-600 mb-1 shrink-0" />
                                        <span className="text-xs font-bold truncate w-full">Email</span>
                                        <span className="text-[9px] text-gray-500 truncate w-full">Mail App</span>
                                    </button>
                                </div>
                            </div>

                            {/* Full Name & Phone */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-sans">
                                        Full Name *
                                    </label>
                                    <div className="relative flex items-center bg-white rounded-lg border border-gray-200 px-3 py-2.5 focus-within:border-[#A07D5A] transition-all">
                                        <User className="text-[#A07D5A] w-4 h-4 mr-2 shrink-0" />
                                        <input
                                            type="text"
                                            placeholder="Your full name"
                                            required
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            className="w-full bg-transparent outline-none text-gray-900 text-xs font-sans font-medium"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-sans">
                                        Phone Number *
                                    </label>
                                    <div className="relative flex items-center bg-white rounded-lg border border-gray-200 px-3 py-2.5 focus-within:border-[#A07D5A] transition-all">
                                        <Phone className="text-[#A07D5A] w-4 h-4 mr-2 shrink-0" />
                                        <input
                                            type="tel"
                                            placeholder={settings?.officeInfo?.phoneNumber || '+880 1700 000 000'}
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full bg-transparent outline-none text-gray-900 text-xs font-sans font-medium"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* CONDITIONAL PREFERRED DATE, TIME SLOT, AND PRACTICE AREA */}
                            {showDetails && (
                                <div className="space-y-3.5 animate-fadeIn">
                                    {/* PREFERRED DATE & TIME SLOT */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                        {/* PREFERRED DATE * */}
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-sans">
                                                PREFERRED DATE *
                                            </label>
                                            <div className="relative flex items-center bg-white rounded-lg border border-gray-200 px-3 py-2.5 focus-within:border-[#A07D5A] transition-all">
                                                <Calendar className="text-[#A07D5A] w-4 h-4 mr-2 shrink-0" />
                                                <input
                                                    type="date"
                                                    required
                                                    value={formData.preferredDate}
                                                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                                                    className="w-full bg-transparent outline-none text-gray-900 text-xs font-sans font-medium cursor-pointer"
                                                />
                                            </div>
                                        </div>

                                        {/* TIME SLOT * */}
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-sans">
                                                TIME SLOT *
                                            </label>
                                            <div className="relative flex items-center bg-white rounded-lg border border-gray-200 px-3 py-2.5 focus-within:border-[#A07D5A] transition-all">
                                                <Clock className="text-[#A07D5A] w-4 h-4 mr-2 shrink-0" />
                                                <select
                                                    value={formData.preferredTime}
                                                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                                                    className="w-full bg-transparent outline-none text-gray-900 text-xs font-sans font-medium cursor-pointer appearance-none pr-6"
                                                >
                                                    {TIME_SLOT_OPTIONS.map((slot: string) => (
                                                        <option key={slot} value={slot}>
                                                            {slot}
                                                        </option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="text-gray-400 w-4 h-4 absolute right-3 pointer-events-none" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* PRACTICE AREA / SUBJECT * */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-sans">
                                            SERVICE / SUBJECT *
                                        </label>
                                        <div className="relative flex items-center bg-white rounded-lg border border-gray-200 px-3 py-2.5 focus-within:border-[#A07D5A] transition-all">
                                            <Scale className="text-[#A07D5A] w-4 h-4 mr-2 shrink-0" />
                                            <select
                                                value={formData.practiceArea}
                                                onChange={(e) => setFormData({ ...formData, practiceArea: e.target.value })}
                                                className="w-full bg-transparent outline-none text-gray-900 text-xs font-sans font-medium cursor-pointer appearance-none pr-6"
                                            >
                                                {PRACTICE_AREA_OPTIONS.map((area) => (
                                                    <option key={area.value} value={area.value}>
                                                        {area.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <ChevronDown className="text-gray-400 w-4 h-4 absolute right-3 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* DYNAMIC CHAMBER MAP & NAVIGATION VIEW WHEN CHAMBER IS SELECTED */}
                            {formData.contactOption === "chamber" && (
                                <div className="bg-gray-50 border border-gray-200 p-3.5 sm:p-4 rounded-xl space-y-3 font-sans animate-fadeIn">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <MapPin className="w-4 h-4 text-red-600 shrink-0" />
                                            <span className="text-xs font-bold text-gray-900 leading-tight">
                                                Chamber HQ: {settings?.officeInfo?.chamberLocation || 'Chamber Location'}
                                            </span>
                                        </div>
                                        <a
                                            href={settings?.officeInfo?.chamberLocation ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.officeInfo.chamberLocation)}` : settings?.chamberInfo?.mapNavigationUrl || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold px-3 py-1.5 rounded transition-colors shrink-0 self-start sm:self-auto"
                                        >
                                            <Navigation className="w-3.5 h-3.5" />
                                            Start Navigation
                                        </a>
                                    </div>

                                    {settings?.chamberInfo?.mapEmbedUrl && (
                                        <div className="w-full h-36 sm:h-40 rounded-lg overflow-hidden border border-gray-200 relative">
                                            <iframe
                                                title="Modal Chamber Location"
                                                src={settings?.chamberInfo?.mapEmbedUrl || ''}
                                                width="100%"
                                                height="100%"
                                                style={{ border: 0 }}
                                                loading="lazy"
                                            ></iframe>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Brief Notes */}
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-sans">
                                    CASE BRIEF / BRIEF NOTES (OPTIONAL)
                                </label>
                                <textarea
                                    placeholder="Provide any relevant details about your legal inquiry..."
                                    rows={2}
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                    className="w-full bg-white rounded-lg border border-gray-200 p-3 outline-none text-gray-900 text-xs font-sans font-medium focus:border-[#A07D5A] transition-all resize-none"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full font-sans font-bold py-3.5 rounded-lg text-xs uppercase tracking-widest transition-colors shadow-sm mt-2 text-white disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${formData.contactOption === "whatsapp"
                                    ? "bg-emerald-600 hover:bg-emerald-700"
                                    : formData.contactOption === "phone"
                                        ? "bg-[#A07D5A] hover:bg-[#866645]"
                                        : formData.contactOption === "chamber"
                                            ? "bg-red-600 hover:bg-red-700"
                                            : "bg-blue-600 hover:bg-blue-700"
                                    }`}
                            >
                                {isSubmitting ? (
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                ) : (
                                    <>
                                        {formData.contactOption === "whatsapp" && "Open WhatsApp Direct App"}
                                        {formData.contactOption === "phone" && "Open Direct Call Dialer App"}
                                        {formData.contactOption === "chamber" && "Confirm Chamber Meeting Appointment"}
                                        {formData.contactOption === "email" && "Open Email App"}
                                    </>
                                )}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
