"use client";

import { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { getWhatsAppMessageLink } from "@/src/constants/contactInfo";

export default function FloatingWhatsApp() {
    const [waLink, setWaLink] = useState(getWhatsAppMessageLink());

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/settings`)
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) {
                    const waNumber = data.data.officeInfo?.whatsappNumber?.replace(/\D/g, '');
                    const lawyerName = data.data.chamberInfo?.lawyerName;
                    setWaLink(getWhatsAppMessageLink(undefined, waNumber, lawyerName));
                }
            })
            .catch(err => console.error("Error fetching settings for WhatsApp widget:", err));
    }, []);

    return (
        <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact on WhatsApp"
            className="fixed bottom-6 right-6 z-50 bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center border-2 border-white group"
        >
            <MessageSquare className="w-5 h-5 fill-current" />
            <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out text-[10px] sm:text-xs font-bold uppercase tracking-wider pl-0 group-hover:pl-2">
                Chat on WhatsApp
            </span>
        </a>
    );
}
