import Image from "next/image";
import Link from "next/link";

const TopHeader = () => {
    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 w-full border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo Section */}
                    <div className="flex items-center gap-2">
                        <Image src={'/image.png'} alt="Logo" width={45} height={45} className="object-contain" />
                        <span className="text-2xl font-bold text-[#A07D5A] tracking-wide">Law Firm</span>
                    </div>

                    {/* Navigation Links */}
                    <nav className="hidden lg:flex gap-8 items-center">
                        <Link href="/" className="text-[#A07D5A] font-semibold border-b-2 border-[#A07D5A] pb-1">
                            Home
                        </Link>
                        <Link href="/about" className="text-gray-700 hover:text-[#A07D5A] font-semibold transition-colors">
                            About Me
                        </Link>
                        <Link href="/services" className="text-gray-700 hover:text-[#A07D5A] font-semibold transition-colors">
                            Services
                        </Link>
                        <Link href="/case-study" className="text-gray-700 hover:text-[#A07D5A] font-semibold transition-colors">
                            Case Study
                        </Link>
                        <Link href="/contact" className="text-gray-700 hover:text-[#A07D5A] font-semibold transition-colors">
                            Contact
                        </Link>
                        <Link href="/blog" className="text-gray-700 hover:text-[#A07D5A] font-semibold transition-colors">
                            Blog
                        </Link>
                        <Link href="/gallery" className="text-gray-700 hover:text-[#A07D5A] font-semibold transition-colors">
                            Gallery
                        </Link>
                    </nav>

                    {/* Action Button */}
                    <div className="hidden md:block">
                        <button className="border border-[#A07D5A] text-[#A07D5A] hover:bg-[#A07D5A] hover:text-white transition-colors px-6 py-2.5 rounded font-medium">
                            Book Appointment
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopHeader;