export const CHAMBER_CONTACT_INFO = {
    lawyerName: "Advocate Abdullah",
    lawyerTitle: "Senior Advocate & Head of Chamber",
    firmName: "Architouch Legal Chamber",
    phone: "+880 1700 000 000",
    phoneRaw: "+8801700000000",
    whatsapp: "+880 1700 000 000",
    whatsappRaw: "8801700000000",
    email: "info@lawfirm.com",
    address: "123 Legal Avenue, Gulshan Avenue, Dhaka-1212, Bangladesh",
    chamberHours: "Sunday – Thursday: 9:00 AM – 7:00 PM",
    coordinates: {
        lat: 23.750858,
        lng: 90.391080,
    },
    mapEmbedUrl: "https://maps.google.com/maps?q=23.750858,90.391080&hl=en&z=16&output=embed",
    mapNavigationUrl: "https://www.google.com/maps/dir/?api=1&destination=23.750858,90.391080",
    socialLinks: {
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        youtube: "https://youtube.com",
    },
};

export const PRACTICE_AREA_OPTIONS = [
    { value: "Corporate Law", label: "Corporate Law & Litigation" },
    { value: "Real Estate", label: "Real Estate & Property Acquisition" },
    { value: "Criminal Defense", label: "Criminal Defense & Audit Investigation" },
    { value: "Regulatory Appeals", label: "Administrative & Regulatory Appeals" },
    { value: "Family & Estate", label: "Family Law & Estate Planning" },
    { value: "General Consultation", label: "General Legal Advisory" },
];

export const TIME_SLOT_OPTIONS = [
    { value: "10:00 AM - Morning", label: "10:00 AM - Morning" },
    { value: "12:00 PM - Midday", label: "12:00 PM - Midday" },
    { value: "03:00 PM - Afternoon", label: "03:00 PM - Afternoon" },
    { value: "05:00 PM - Evening", label: "05:00 PM - Evening" },
];

export function getWhatsAppMessageLink(details?: {
    fullName?: string;
    phone?: string;
    preferredDate?: string;
    preferredTime?: string;
    practiceArea?: string;
    notes?: string;
}) {
    const { fullName = "", phone = "", preferredDate = "", preferredTime = "", practiceArea = "", notes = "" } = details || {};
    const nameInfo = fullName ? `%0A*Name:* ${fullName}` : "";
    const phoneInfo = phone ? `%0A*Phone:* ${phone}` : "";
    const dateInfo = preferredDate ? `%0A*Date:* ${preferredDate} (${preferredTime})` : "";
    const areaInfo = practiceArea ? `%0A*Practice Area:* ${practiceArea}` : "";
    const notesInfo = notes ? `%0A*Notes:* ${notes}` : "";

    const message = `Hello ${CHAMBER_CONTACT_INFO.lawyerName}, I would like to inquire about legal consultation.${nameInfo}${phoneInfo}${dateInfo}${areaInfo}${notesInfo}`;
    return `https://wa.me/${CHAMBER_CONTACT_INFO.whatsappRaw}?text=${message}`;
}

export function getEmailMailtoLink(details?: {
    fullName?: string;
    phone?: string;
    preferredDate?: string;
    preferredTime?: string;
    practiceArea?: string;
    notes?: string;
}) {
    const { fullName = "Client", phone = "", preferredDate = "", preferredTime = "", practiceArea = "", notes = "" } = details || {};
    const subject = encodeURIComponent(`Legal Appointment Request - ${fullName}`);
    const body = encodeURIComponent(`Hello ${CHAMBER_CONTACT_INFO.lawyerName},\n\nI would like to request an appointment.\n\nName: ${fullName}\nPhone: ${phone}\nDate: ${preferredDate} (${preferredTime})\nPractice Area: ${practiceArea}\nNotes: ${notes}`);
    return `mailto:${CHAMBER_CONTACT_INFO.email}?subject=${subject}&body=${body}`;
}
