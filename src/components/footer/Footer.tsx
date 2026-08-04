import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Map Area */}
                    <div className="rounded-lg overflow-hidden h-48 bg-gray-800 relative">
                        <Image src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop" alt="Map Location" fill className="object-cover opacity-70" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <MapPin className="text-white w-8 h-8 drop-shadow-md" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">About Me</Link></li>
                            <li><Link href="/case-study" className="hover:text-white transition-colors">Case Studies</Link></li>
                            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
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
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-[#A07D5A]" />
                                <span>+011 725 6650</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-[#A07D5A]" />
                                <span>architouch@design.com</span>
                            </li>
                        </ul>
                        <div className="flex gap-4 mt-6">
                            <Link href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#A07D5A] transition-colors text-xs font-bold text-white">FB</Link>
                            <Link href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#A07D5A] transition-colors text-xs font-bold text-white">X</Link>
                            <Link href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#A07D5A] transition-colors text-xs font-bold text-white">IN</Link>
                        </div>
                    </div>
                </div>
                
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
                    <p>&copy; 2024 Law Firm. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
