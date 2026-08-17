export const PRACTICE_AREA_OPTIONS = [
    { value: "Civil Matters", label: "Civil Matters" },
    { value: "Criminal Defense", label: "Criminal Defense" },
    { value: "Landlord & Tenant", label: "Landlord & Tenant" },
    { value: "Family Laws & Divorce", label: "Family Laws & Divorce" },
    { value: "Cheque & Money Claims", label: "Cheque & Money Claims" },
    { value: "Succession", label: "Succession" },
    { value: "Will & Probate", label: "Will & Probate" },
    { value: "Human Rights", label: "Human Rights" },
    { value: "Writ", label: "Writ" },
    { value: "Income Tax on service", label: "Income Tax on service" },
];
 
export const TIME_SLOT_OPTIONS = [
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM",
    "05:00 PM - 06:00 PM",
    "06:00 PM - 07:00 PM",
];

export function getWhatsAppMessageLink(details?: {
    fullName?: string;
    phone?: string;
    preferredDate?: string;
    preferredTime?: string;
    practiceArea?: string;
    notes?: string;
}, targetWhatsapp?: string, lawyerName?: string) {
    
    const { fullName = "", phone = "", preferredDate = "", preferredTime = "", practiceArea = "", notes = "" } = details || {};
    const nameInfo = fullName ? `%0A*Name:* ${fullName}` : "";
    const phoneInfo = phone ? `%0A*Phone:* ${phone}` : "";
    const dateInfo = preferredDate ? `%0A*Date:* ${preferredDate} (${preferredTime})` : "";
    const areaInfo = practiceArea ? `%0A*Practice Area:* ${practiceArea}` : "";
    const notesInfo = notes ? `%0A*Notes:* ${notes}` : "";

    const lName = lawyerName || 'Advocate';
    const message = `Hello ${lName},I would like to inquire about legal consultation.${nameInfo}${phoneInfo}${dateInfo}${areaInfo}${notesInfo}`;
    const waNumber = targetWhatsapp || '';

 
    
    return `https://wa.me/${waNumber}?text=${message}`;
}

export function getEmailMailtoLink(details?: {
    fullName?: string;
    phone?: string;
    preferredDate?: string;
    preferredTime?: string;
    practiceArea?: string;
    notes?: string;
}, targetEmail?: string, lawyerName?: string) {
    const { fullName = "Client", phone = "", preferredDate = "", preferredTime = "", practiceArea = "", notes = "" } = details || {};
    const lName = lawyerName || 'Advocate';
    const subject = encodeURIComponent(`Legal Appointment Request - ${fullName}`);
    const body = encodeURIComponent(`Hello ${lName},\n\nI would like to request an appointment.\n\nName: ${fullName}\nPhone: ${phone}\nDate: ${preferredDate} (${preferredTime})\nPractice Area: ${practiceArea}\nNotes: ${notes}`);
    const emailAddress = targetEmail || 'advocarebureau@gmail.com';
    return `mailto:${emailAddress}?subject=${subject}&body=${body}`;
}
