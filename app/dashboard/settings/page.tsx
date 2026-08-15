"use client";

import { useState, useEffect } from "react";
import { Loader2, Save } from "lucide-react";

export default function SettingsManagement() {
    const [settings, setSettings] = useState({
        socialLinks: { facebook: "", x: "", linkedin: "" },
        officeInfo: { email: "", phoneNumber: "", telephoneNumber: "", whatsappNumber: "", chamberLocation: "" },

        chamberInfo: { lawyerName: "", lawyerTitle: "", firmName: "", chamberHours: "", mapEmbedUrl: "", mapNavigationUrl: "" },
        timeSlots: [] as string[]
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' | '' }>({ text: '', type: '' });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/settings`);
            if (res.ok) {
                const data = await res.json();
                if (data.data) {
                    setSettings({
                        socialLinks: data.data.socialLinks || { facebook: "", x: "", linkedin: "" },
                        officeInfo: data.data.officeInfo || { email: "", phoneNumber: "", telephoneNumber: "", whatsappNumber: "", chamberLocation: "" },

                        chamberInfo: data.data.chamberInfo || { lawyerName: "", lawyerTitle: "", firmName: "", chamberHours: "", mapEmbedUrl: "", mapNavigationUrl: "" },
                        timeSlots: data.data.timeSlots || []
                    });
                }
            }
        } catch (error) {
            console.error("Error fetching settings:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage({ text: '', type: '' });

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/settings`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(settings)
            });

            const data = await res.json();
            if (data.success) {
                setMessage({ text: 'Settings updated successfully', type: 'success' });
            } else {
                setMessage({ text: data.message || 'Failed to update settings', type: 'error' });
            }
        } catch (error) {
            console.error("Error saving settings:", error);
            setMessage({ text: 'An error occurred while saving', type: 'error' });
        } finally {
            setIsSaving(false);
        }
    };

    const handleChange = (section: keyof typeof settings, field: string, value: string) => {
        setSettings(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-64"><Loader2 className="w-8 h-8 animate-spin text-gray-500" /></div>;
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
            </div>

            {message.text && (
                <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSave} className="space-y-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                {/* Social Links Section */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Social Links</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
                            <input type="text" value={settings.socialLinks.facebook} onChange={(e) => handleChange('socialLinks', 'facebook', e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900" placeholder="https://facebook.com/..." />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">X (Twitter) URL</label>
                            <input type="text" value={settings.socialLinks.x} onChange={(e) => handleChange('socialLinks', 'x', e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900" placeholder="https://x.com/..." />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                            <input type="text" value={settings.socialLinks.linkedin} onChange={(e) => handleChange('socialLinks', 'linkedin', e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900" placeholder="https://linkedin.com/in/..." />
                        </div>
                    </div>
                </div>

                {/* Office Info Section */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Office Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Office Email</label>
                            <input type="email" value={settings.officeInfo.email} onChange={(e) => handleChange('officeInfo', 'email', e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900" placeholder="office@example.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input type="text" value={settings.officeInfo.phoneNumber} onChange={(e) => handleChange('officeInfo', 'phoneNumber', e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Telephone Number</label>
                            <input type="text" value={settings.officeInfo.telephoneNumber} onChange={(e) => handleChange('officeInfo', 'telephoneNumber', e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                            <input type="text" value={settings.officeInfo.whatsappNumber} onChange={(e) => handleChange('officeInfo', 'whatsappNumber', e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Chamber Location</label>
                            <textarea value={settings.officeInfo.chamberLocation} onChange={(e) => handleChange('officeInfo', 'chamberLocation', e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900" rows={2} placeholder="Full office address"></textarea>
                        </div>
                    </div>
                </div>



                {/* Chamber Info Section */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Chamber & Main Info</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Lawyer Name</label>
                            <input type="text" value={settings.chamberInfo.lawyerName} onChange={(e) => handleChange('chamberInfo', 'lawyerName', e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Lawyer Title</label>
                            <input type="text" value={settings.chamberInfo.lawyerTitle} onChange={(e) => handleChange('chamberInfo', 'lawyerTitle', e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Firm Name</label>
                            <input type="text" value={settings.chamberInfo.firmName} onChange={(e) => handleChange('chamberInfo', 'firmName', e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Chamber Hours</label>
                            <input type="text" value={settings.chamberInfo.chamberHours} onChange={(e) => handleChange('chamberInfo', 'chamberHours', e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900" placeholder="e.g. Sunday – Thursday: 9:00 AM – 7:00 PM" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Map Embed URL (Iframe src)</label>
                            <input type="text" value={settings.chamberInfo.mapEmbedUrl} onChange={(e) => handleChange('chamberInfo', 'mapEmbedUrl', e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Map Navigation URL (Directions)</label>
                            <input type="text" value={settings.chamberInfo.mapNavigationUrl} onChange={(e) => handleChange('chamberInfo', 'mapNavigationUrl', e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900" />
                        </div>
                    </div>
                </div>

                {/* Time Slots Section */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Appointment Time Slots</h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Available Time Slots (Comma Separated)</label>
                        <textarea 
                            value={settings.timeSlots.join(', ')} 
                            onChange={(e) => setSettings(prev => ({ ...prev, timeSlots: e.target.value.split(',').map(s => s.trim()).filter(s => s) }))} 
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900" 
                            rows={3} 
                            placeholder="10:00 AM - Morning, 12:00 PM - Midday"
                        ></textarea>
                        <p className="text-xs text-gray-500 mt-1">Users will see these options when booking an appointment.</p>
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t">
                    <button type="submit" disabled={isSaving} className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:bg-slate-400 transition-colors">
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {isSaving ? "Saving..." : "Save Settings"}
                    </button>
                </div>
            </form>
        </div>
    );
}
