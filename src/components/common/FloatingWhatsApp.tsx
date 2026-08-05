"use client";

import { MessageSquare } from "lucide-react";
import { getWhatsAppMessageLink } from "@/src/constants/contactInfo";

export default function FloatingWhatsApp() {
    return (
        <a
            href={getWhatsAppMessageLink()}
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
