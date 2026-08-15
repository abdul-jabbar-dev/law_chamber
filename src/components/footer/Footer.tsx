import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

async function getSettings() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${baseUrl}/settings`, { next: { revalidate: 60 } });
        const data = await res.json();

        if (data.success && data.data) {
            return data.data;
        }
        return null;
    } catch (error) {
        console.error("Failed to fetch settings:", error);
        return null;
    }
}

const Footer = async () => {
    const settings = await getSettings();
    const officeInfo = settings?.officeInfo || { phoneNumber: '+011 725 6650', email: 'architouch@design.com' };
    const socialLinks = settings?.socialLinks || { facebook: '#', x: '#', linkedin: '#' };

    return (
        <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Logo & Description */}
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="flex w-32 items-center gap-3">
                            <Image src={'/svg/logoSvg.svg'} alt="Logo" width={80} height={80} style={{ width: 'auto', height: 'auto' }} />
                        </Link>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Providing expert legal solutions with integrity, dedication, and a commitment to justice.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">About Me</Link></li>
                            <li><Link href="/case-studies" className="hover:text-white transition-colors">Case Studies</Link></li>
                            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                            <li><Link href="/leave-review" className="hover:text-white transition-colors">Leave a Review</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-bold mb-4">Services</h4>
                        <ul className="space-y-2">
                            <li><Link href="/services/civil" className="hover:text-white transition-colors">Civil</Link></li>
                            <li><Link href="/services/corporate" className="hover:text-white transition-colors">Corporate</Link></li>
                            <li><Link href="/services/administrative" className="hover:text-white transition-colors">Administrative</Link></li>
                            <li><Link href="/services/criminal" className="hover:text-white transition-colors">Criminal</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-bold mb-4">Law Firm</h4>
                        <ul className="space-y-4">
                            {officeInfo.phoneNumber ? <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-[#A07D5A]" />
                                <span>{officeInfo.phoneNumber}</span>
                            </li> : null}
                            {officeInfo.email ? <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-[#A07D5A]" />
                                <span>{officeInfo.email}</span>
                            </li> : null}
                        </ul>
                        <div className="flex gap-4 mt-6">
                            <Link href={socialLinks.facebook || "#"} target="_blank" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#A07D5A] transition-colors text-xs font-bold text-white">FB</Link>
                            <Link href={socialLinks.x || "#"} target="_blank" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#A07D5A] transition-colors text-xs font-bold text-white">X</Link>
                            <Link href={socialLinks.linkedin || "#"} target="_blank" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#A07D5A] transition-colors text-xs font-bold text-white">IN</Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm gap-4">
                    <p>&copy; {new Date().getFullYear()} Law Firm. All rights reserved.</p>

                    {/* Watermark Developer Credit */}
                    <div className="flex items-center gap-1 text-xs text-gray-500 font-sans select-none">
                        <span className="opacity-70">Developed by</span>
                        <abbr
                            title="Abdul Jabbar"
                            className="group relative no-underline cursor-pointer inline-flex items-center text-[#A07D5A] font-bold hover:text-amber-400 transition-colors duration-500 font-sans tracking-wide overflow-hidden"
                        >
                            <span className="inline-flex items-center">
                                <span className="text-[#A07D5A] group-hover:text-amber-400 transition-colors font-extrabold text-xs">A</span>
                                <span className="max-w-0 w-0 opacity-0 group-hover:max-w-20 group-hover:w-auto group-hover:opacity-100 transition-all duration-500 ease-out overflow-hidden whitespace-nowrap text-xs font-semibold text-[#A07D5A]">
                                    bdul
                                </span>
                            </span>

                            <span className="w-0 group-hover:w-1 transition-all duration-500"></span>

                            <span className="inline-flex items-center">
                                <span className="text-[#A07D5A] group-hover:text-amber-400 transition-colors font-extrabold text-xs">J</span>
                                <span className="max-w-0 w-0 opacity-0 group-hover:max-w-20 group-hover:w-auto group-hover:opacity-100 transition-all duration-500 ease-out overflow-hidden whitespace-nowrap text-xs font-semibold text-[#A07D5A]">
                                    abbar
                                </span>
                            </span>
                        </abbr>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
