"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppointmentModal } from "@/src/context/AppointmentContext";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Me", href: "/about" },
    { name: "Services", href: "/practice-areas" },
  
    { name: "Case Study", href: "/case-study" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
    { name: "Gallery", href: "/gallery" },
];

const TopHeader = () => {
    const pathname = usePathname();
    const { openAppointmentModal } = useAppointmentModal();

    return (
        <header className="bg-white/60 backdrop-blur-md sticky top-0 z-50 w-full border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-2">
                        <Image src={'/svg/logoSvg.svg'} alt="Logo" width={50} height={50} />
                        <span className="text-2xl font-bold text-[#A07D5A] tracking-wide font-serif">Law Firm</span>
                    </Link>

                    {/* Navigation Links */}
                    <nav className="hidden lg:flex gap-8 items-center">
                        {navLinks.map((link) => {
                            const isActive = link.href === "/" 
                                ? pathname === "/" 
                                : pathname.startsWith(link.href);

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={
                                        isActive
                                            ? "text-[#A07D5A] font-semibold border-b-2 border-[#A07D5A] pb-1 transition-all"
                                            : "text-gray-700 hover:text-[#A07D5A] font-semibold transition-colors"
                                    }
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Action Button */}
                    <div className="hidden md:block">
                        <button 
                            onClick={openAppointmentModal}
                            className="border border-[#A07D5A] text-[#A07D5A] hover:bg-[#A07D5A] hover:text-white transition-colors px-6 py-2.5 rounded font-medium cursor-pointer"
                        >
                            Book Appointment
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopHeader;