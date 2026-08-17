"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppointmentModal } from "@/src/context/AppointmentContext";
import { Menu, X, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Me", href: "/about" },
    { name: "Services", href: "/practice-areas" },
  
    { name: "Case Study", href: "/case-studies" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
    { name: "Gallery", href: "/gallery" },
];

type TopHeaderProps = {
    session?: any;
};

const TopHeader = ({ session }: TopHeaderProps) => {
    const pathname = usePathname();
    const { openAppointmentModal } = useAppointmentModal();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="bg-white/60 backdrop-blur-md sticky top-0 z-50 w-full border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className=" w-14 h-14">
                            <Image src={'/svg/logoSvg.svg'} alt="Logo" width={50} height={50} style={{ width: 'auto', height: 'auto' }} />
                        </div>
                        <span className="text-3xl font-bold text-gray-700 tracking-wide font-serif">LAB</span>
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
                    <div className="hidden md:flex gap-4 items-center">
                        {session ? (
                            <>
                                <Link 
                                    href="/dashboard"
                                    className="font-medium text-gray-700 hover:text-[#A07D5A] transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <button 
                                    onClick={() => signOut({ callbackUrl: "/login" })}
                                    className="flex items-center gap-1.5 font-medium text-red-600 hover:text-red-700 transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <button 
                                onClick={openAppointmentModal}
                                className="border border-[#A07D5A] text-[#A07D5A] hover:bg-[#A07D5A] hover:text-white transition-colors px-6 py-2.5 rounded font-medium cursor-pointer"
                            >
                                Book Appointment
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Toggle Button */}
                    <div className="lg:hidden flex items-center">
                        <button 
                            onClick={toggleMobileMenu}
                            className="text-gray-800 hover:text-[#A07D5A] transition-colors p-2 focus:outline-none"
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-lg animate-in slide-in-from-top-2">
                    <nav className="flex flex-col px-4 pt-2 pb-6 space-y-2">
                        {navLinks.map((link) => {
                            const isActive = link.href === "/" 
                                ? pathname === "/" 
                                : pathname.startsWith(link.href);

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={closeMobileMenu}
                                    className={
                                        isActive
                                            ? "text-[#A07D5A] font-semibold border-l-4 border-[#A07D5A] pl-3 py-2 bg-gray-50 transition-all rounded-r"
                                            : "text-gray-700 hover:text-[#A07D5A] hover:bg-gray-50 font-semibold pl-4 py-2 transition-colors rounded"
                                    }
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                        <div className="pt-4 px-2 md:hidden flex flex-col gap-3">
                            {session ? (
                                <>
                                    <Link 
                                        href="/dashboard"
                                        onClick={closeMobileMenu}
                                        className="w-full border border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors px-6 py-3 rounded font-medium text-center block"
                                    >
                                        Go to Dashboard
                                    </Link>
                                    <button 
                                        onClick={() => {
                                            closeMobileMenu();
                                            signOut({ callbackUrl: "/login" });
                                        }}
                                        className="w-full flex items-center justify-center gap-2 border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-colors px-6 py-3 rounded font-medium text-center"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <button 
                                    onClick={() => {
                                        closeMobileMenu();
                                        openAppointmentModal();
                                    }}
                                    className="w-full border border-[#A07D5A] text-[#A07D5A] hover:bg-[#A07D5A] hover:text-white transition-colors px-6 py-3 rounded font-medium text-center"
                                >
                                    Book Appointment
                                </button>
                            )}
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default TopHeader;
