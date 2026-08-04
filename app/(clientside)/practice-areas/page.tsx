import Image from "next/image";
import { Scale, Handshake, Landmark, Gavel } from "lucide-react";

export default function PracticeAreasPage() {
    return (
        <div className="w-full min-h-screen bg-[#FAFAFA] flex flex-col text-gray-900">
            {/* SECTION 1: Main Practice Areas Content */}
            <section className="w-full relative bg-white py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
                {/* Background Marble Texture */}
                <div
                    className="absolute inset-0 z-0 opacity-40 mix-blend-multiply pointer-events-none"
                    style={{ backgroundImage: "url('/bg/texture.png')", backgroundSize: "cover", backgroundPosition: "center" }}
                ></div>

                <div className="relative z-10 max-w-6xl mx-auto flex flex-col">
                    <div className="mb-16 text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1A1A1A] mb-4 tracking-wider uppercase">
                            Our Services
                        </h1>
                        <div className="w-24 h-0.5 bg-[#A07D5A] mx-auto mb-6"></div>
                        <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
                            Expert Legal Guidance and Strategic Representation for Clients in Bangladesh and Globally.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* CIVIL MATTERS CARD */}
                        <div className="bg-white p-8 md:p-10 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <Scale className="w-9 h-9 text-[#A07D5A]" strokeWidth={1.5} />
                                    <h2 className="text-xl font-semibold text-[#1A1A1A] uppercase tracking-wide">Civil Matters</h2>
                                </div>
                                <ul className="space-y-2.5 mb-6 text-sm text-gray-800">
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Contract Disputes</li>
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Property & Land Matters</li>
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Family Law & Divorce</li>
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Wills & Estates</li>
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Personal Injury</li>
                                </ul>
                                <p className="text-xs md:text-sm text-gray-600 mb-8 leading-relaxed">
                                    Strategic approach to resolving disputes and protecting assets. Client-focused counsel for sensitive matters.
                                </p>
                            </div>
                            <button className="w-full bg-[#A07D5A] hover:bg-[#866645] text-white font-medium py-3 px-4 rounded text-xs uppercase tracking-widest transition-colors">
                                Explore Civil Litigation Process
                            </button>
                        </div>

                        {/* CORPORATE AFFAIRS CARD */}
                        <div className="bg-white p-8 md:p-10 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <Handshake className="w-9 h-9 text-[#A07D5A]" strokeWidth={1.5} />
                                    <h2 className="text-xl font-semibold text-[#1A1A1A] uppercase tracking-wide">Corporate Affairs</h2>
                                </div>
                                <ul className="space-y-2.5 mb-6 text-sm text-gray-800">
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Business Formation & Structuring</li>
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Mergers & Acquisitions</li>
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Corporate Governance</li>
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> IP & Licensing</li>
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Regulatory Compliance</li>
                                </ul>
                                <p className="text-xs md:text-sm text-gray-600 mb-8 leading-relaxed">
                                    Global business counsel from local perspective. Experience with local market dynamics and global standards.
                                </p>
                            </div>
                            <button className="w-full bg-[#A07D5A] hover:bg-[#866645] text-white font-medium py-3 px-4 rounded text-xs uppercase tracking-widest transition-colors">
                                View Corporate Case Studies
                            </button>
                        </div>

                        {/* ADMINISTRATIVE & REGULATORY CARD */}
                        <div className="bg-white p-8 md:p-10 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <Landmark className="w-9 h-9 text-[#A07D5A]" strokeWidth={1.5} />
                                    <h2 className="text-xl font-semibold text-[#1A1A1A] uppercase tracking-wide">Administrative & Regulatory</h2>
                                </div>
                                <ul className="space-y-2.5 mb-6 text-sm text-gray-800">
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Government Relations</li>
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Licensing & Permits</li>
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Public Procurement</li>
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Regulatory Audits</li>
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Administrative Appeals</li>
                                </ul>
                                <p className="text-xs md:text-sm text-gray-600 mb-8 leading-relaxed">
                                    Navigate complex bureaucratic systems with expert guidance. Represent your interests before government agencies.
                                </p>
                            </div>
                            <button className="w-full bg-[#A07D5A] hover:bg-[#866645] text-white font-medium py-3 px-4 rounded text-xs uppercase tracking-widest transition-colors">
                                Meet Our Administrative Lawyers
                            </button>
                        </div>

                        {/* CRIMINAL DEFENSE CARD */}
                        <div className="bg-white p-8 md:p-10 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <Gavel className="w-9 h-9 text-[#A07D5A]" strokeWidth={1.5} />
                                    <h2 className="text-xl font-semibold text-[#1A1A1A] uppercase tracking-wide">Criminal Defense</h2>
                                </div>
                                <ul className="space-y-2.5 mb-6 text-sm text-gray-800">
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> White-Collar Crime</li>
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Serious Felony Charges</li>
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Strategic Defense Planning</li>
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Investigation Support</li>
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Post-Conviction Relief</li>
                                </ul>
                                <p className="text-xs md:text-sm text-gray-600 mb-8 leading-relaxed">
                                    Robust defense against serious criminal charges. Protect your rights and future with strategic representation.
                                </p>
                            </div>
                            <button className="w-full bg-[#A07D5A] hover:bg-[#866645] text-white font-medium py-3 px-4 rounded text-xs uppercase tracking-widest transition-colors">
                                Explore Our Defense Strategies
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2 & 3: Practice Area Highlight & Recent Achievements */}
            <section className="w-full bg-[#F4F4F4] py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-200 overflow-hidden">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* LEFT COLUMN: Office Image & Scale Graphic */}
                    <div className="lg:col-span-7 flex flex-col gap-8">
                        {/* Main Office Image */}
                        <div className="relative w-full h-95 lg:h-120 rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                            <Image
                                src="/img/image.png"
                                alt="Office Background"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Faint Scale Graphic Box */}
                        <div className="relative ml-auto w-3/4 h-45 lg:h-55  lg:block hidden overflow-hidden items-center justify-center">
                            <div className="absolute inset-0 opacity-15  shadow-sm">
                                <Image
                                    src="/img/image.png"
                                    alt="Scale Watermark"
                                    width={800}
                                    height={800}
                                    className="object-contain  rounded-xl border  border-gray-100   w-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Formal Information Cards */}
                    <div className="lg:col-span-5 flex flex-col gap-8 lg:-ml-12 z-10 relative">

                        {/* PRACTICE AREA HIGHLIGHT */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-md p-8">
                            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-6 border-b border-gray-200 pb-3">
                                Service Highlight
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-gray-200">
                                        <Image src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" alt="Client Nama" fill className="object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 text-sm">Client Nama</h4>
                                        <p className="text-xs text-gray-600 leading-tight mt-0.5">Corporate<br />Professional Lawyer Page</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-gray-200">
                                        <Image src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" alt="Client Nama" fill className="object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 text-sm">Client Nama</h4>
                                        <p className="text-xs text-gray-600 leading-tight mt-0.5">Corporate<br />Professional Lawyer Page</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-gray-200">
                                        <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" alt="Kum Radh" fill className="object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 text-sm">Kum Radh</h4>
                                        <p className="text-xs text-gray-600 leading-tight mt-0.5">Criminal Defense<br />Profile Page</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RECENT ACHIEVEMENTS */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-md p-8">
                            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-6 border-b border-gray-200 pb-3">
                                Recent Achievements
                            </h3>
                            <ul className="space-y-3.5 text-xs md:text-sm text-gray-800">
                                <li className="flex items-start">
                                    <span className="text-[#A07D5A] mr-3 font-bold">•</span>
                                    <span>Area-specific Business Formation</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#A07D5A] mr-3 font-bold">•</span>
                                    <span>Case-specific Case Studies</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#A07D5A] mr-3 font-bold">•</span>
                                    <span>Case-specific detailed case Studies</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#A07D5A] mr-3 font-bold">•</span>
                                    <span>Case-specific Detailed Achievements</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#A07D5A] mr-3 font-bold">•</span>
                                    <span>Case-specific ooer detailed case studies</span>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </section>

            {/* SECTION 4: Formal Call to Action */}
            <section className="w-full bg-[#8B6B4C] py-16 px-4 sm:px-6 text-center text-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-8 tracking-wide">
                        Ready to Discuss Your Service Needs?
                    </h2>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="w-full sm:w-auto px-8 py-3.5 border border-white text-white hover:bg-white hover:text-[#8B6B4C] transition-colors rounded text-xs uppercase tracking-widest font-medium">
                            Book Service-Specific Appointment
                        </button>
                        <button className="w-full sm:w-auto px-8 py-3.5 border border-white text-white hover:bg-white hover:text-[#8B6B4C] transition-colors rounded text-xs uppercase tracking-widest font-medium">
                            Meet Our Service Leads
                        </button>
                    </div>
                </div>
            </section>

        </div>
    );
}
