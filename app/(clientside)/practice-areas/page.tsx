"use client";
import { useState } from "react";
import Image from "next/image";
import { Scale, Gavel, Home, Users, Banknote, FileText, Scroll, Globe, FileSignature, Receipt } from "lucide-react";

export default function PracticeAreasPage() {
    const [showAll, setShowAll] = useState(false);

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

                        {/* CIVIL MATTERS */}
                        <div className="bg-white p-8 md:p-10 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <Scale className="w-9 h-9 text-[#A07D5A]" strokeWidth={1.5} />
                                    <h2 className="text-xl font-semibold text-[#1A1A1A] uppercase tracking-wide">Civil Matters</h2>
                                </div>
                                <ul className="space-y-2.5 mb-6 text-sm text-gray-800">
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Contract Disputes</li>
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Property & Land Matters</li>
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Injunctions & Stay Orders</li>
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Defamation Claims</li>
                                </ul>
                                <p className="text-xs md:text-sm text-gray-600 mb-8 leading-relaxed">
                                    Strategic approach to resolving civil disputes and protecting assets. Client-focused counsel for sensitive matters.
                                </p>
                            </div>

                        </div>

                        {/* CRIMINAL DEFENSE */}
                        <div className="bg-white p-8 md:p-10 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <Gavel className="w-9 h-9 text-[#A07D5A]" strokeWidth={1.5} />
                                    <h2 className="text-xl font-semibold text-[#1A1A1A] uppercase tracking-wide">Criminal Defense</h2>
                                </div>
                                <ul className="space-y-2.5 mb-6 text-sm text-gray-800">
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> White-Collar Crime</li>
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Serious Felony Charges</li>
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Fraud & Embezzlement</li>
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Post-Conviction Relief</li>
                                </ul>
                                <p className="text-xs md:text-sm text-gray-600 mb-8 leading-relaxed">
                                    Robust defense against serious criminal charges. Protect your rights and future with strategic representation.
                                </p>
                            </div>

                        </div>

                        {/* LANDLORD & TENANT */}
                        <div className="bg-white p-8 md:p-10 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <Home className="w-9 h-9 text-[#A07D5A]" strokeWidth={1.5} />
                                    <h2 className="text-xl font-semibold text-[#1A1A1A] uppercase tracking-wide">Landlord & Tenant</h2>
                                </div>
                                <ul className="space-y-2.5 mb-6 text-sm text-gray-800">
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Eviction Proceedings</li>
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Lease Agreements</li>
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Rent Arrears Recovery</li>
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Property Damage Claims</li>
                                </ul>
                                <p className="text-xs md:text-sm text-gray-600 mb-8 leading-relaxed">
                                    Legal support for property leasing and resolving tenant disputes effectively and efficiently.
                                </p>
                            </div>

                        </div>

                        {/* FAMILY LAWS & DIVORCE */}
                        <div className="bg-white p-8 md:p-10 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <Users className="w-9 h-9 text-[#A07D5A]" strokeWidth={1.5} />
                                    <h2 className="text-xl font-semibold text-[#1A1A1A] uppercase tracking-wide">Family Laws & Divorce</h2>
                                </div>
                                <ul className="space-y-2.5 mb-6 text-sm text-gray-800">
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Mutual & Contested Divorce</li>
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Child Custody & Support</li>
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Alimony & Maintenance</li>
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Domestic Violence Defense</li>
                                </ul>
                                <p className="text-xs md:text-sm text-gray-600 mb-8 leading-relaxed">
                                    Compassionate counsel for family legal matters. Navigating sensitive issues with care and expertise.
                                </p>
                            </div>

                        </div>

                        {/* CHEQUE & MONEY CLAIMS */}
                        <div className="bg-white p-8 md:p-10 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <Banknote className="w-9 h-9 text-[#A07D5A]" strokeWidth={1.5} />
                                    <h2 className="text-xl font-semibold text-[#1A1A1A] uppercase tracking-wide">Cheque & Money Claims</h2>
                                </div>
                                <ul className="space-y-2.5 mb-6 text-sm text-gray-800">
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Cheque Dishonour Cases</li>
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Money Recovery Suits</li>
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Promissory Notes</li>
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Financial Fraud Recovery</li>
                                </ul>
                                <p className="text-xs md:text-sm text-gray-600 mb-8 leading-relaxed">
                                    Efficient recovery and resolution of financial disputes. Swift legal action for bounced cheques and debts.
                                </p>
                            </div>

                        </div>

                        {/* SUCCESSION */}
                        <div className="bg-white p-8 md:p-10 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <FileText className="w-9 h-9 text-[#A07D5A]" strokeWidth={1.5} />
                                    <h2 className="text-xl font-semibold text-[#1A1A1A] uppercase tracking-wide">Succession</h2>
                                </div>
                                <ul className="space-y-2.5 mb-6 text-sm text-gray-800">
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Succession Certificates</li>
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Heirship Declarations</li>
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Property Partition</li>
                                    <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Estate Planning</li>
                                </ul>
                                <p className="text-xs md:text-sm text-gray-600 mb-8 leading-relaxed">
                                    Guidance on property inheritance and succession planning ensuring smooth transition of assets.
                                </p>
                            </div>

                        </div>

                        {showAll && (
                            <>
                                {/* WILL & PROBATE */}
                                <div className="bg-white p-8 md:p-10 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                                    <div>
                                        <div className="flex items-center gap-4 mb-6">
                                            <Scroll className="w-9 h-9 text-[#A07D5A]" strokeWidth={1.5} />
                                            <h2 className="text-xl font-semibold text-[#1A1A1A] uppercase tracking-wide">Will & Probate</h2>
                                        </div>
                                        <ul className="space-y-2.5 mb-6 text-sm text-gray-800">
                                            <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Will Drafting & Registration</li>
                                            <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Probate Proceedings</li>
                                            <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Letters of Administration</li>
                                            <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Will Contests & Disputes</li>
                                        </ul>
                                        <p className="text-xs md:text-sm text-gray-600 mb-8 leading-relaxed">
                                            Expertise in drafting airtight wills and navigating the probate process seamlessly through the courts.
                                        </p>
                                    </div>

                                </div>

                                {/* HUMAN RIGHTS */}
                                <div className="bg-white p-8 md:p-10 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                                    <div>
                                        <div className="flex items-center gap-4 mb-6">
                                            <Globe className="w-9 h-9 text-[#A07D5A]" strokeWidth={1.5} />
                                            <h2 className="text-xl font-semibold text-[#1A1A1A] uppercase tracking-wide">Human Rights</h2>
                                        </div>
                                        <ul className="space-y-2.5 mb-6 text-sm text-gray-800">
                                            <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Constitutional Rights</li>
                                            <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Protection from Abuse</li>
                                            <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Freedom of Expression</li>
                                            <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Public Interest Litigation (PIL)</li>
                                        </ul>
                                        <p className="text-xs md:text-sm text-gray-600 mb-8 leading-relaxed">
                                            Fierce advocacy and protection of fundamental human rights against any form of violation.
                                        </p>
                                    </div>

                                </div>

                                {/* WRIT */}
                                <div className="bg-white p-8 md:p-10 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                                    <div>
                                        <div className="flex items-center gap-4 mb-6">
                                            <FileSignature className="w-9 h-9 text-[#A07D5A]" strokeWidth={1.5} />
                                            <h2 className="text-xl font-semibold text-[#1A1A1A] uppercase tracking-wide">Writ</h2>
                                        </div>
                                        <ul className="space-y-2.5 mb-6 text-sm text-gray-800">
                                            <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Habeas Corpus</li>
                                            <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Mandamus & Certiorari</li>
                                            <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Quo Warranto & Prohibition</li>
                                            <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Challenging Gov. Actions</li>
                                        </ul>
                                        <p className="text-xs md:text-sm text-gray-600 mb-8 leading-relaxed">
                                            Filing and arguing complex writ petitions in higher courts to enforce constitutional remedies.
                                        </p>
                                    </div>

                                </div>

                                {/* INCOME TAX ON SERVICE */}
                                <div className="bg-white p-8 md:p-10 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                                    <div>
                                        <div className="flex items-center gap-4 mb-6">
                                            <Receipt className="w-9 h-9 text-[#A07D5A]" strokeWidth={1.5} />
                                            <h2 className="text-xl font-semibold text-[#1A1A1A] uppercase tracking-wide">Income Tax on service</h2>
                                        </div>
                                        <ul className="space-y-2.5 mb-6 text-sm text-gray-800">
                                            <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Tax Assessment & Returns</li>
                                            <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Tax Planning & Advisory</li>
                                            <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Audit Representation</li>
                                            <li className="flex items-start"><span className="text-[#A07D5A] mr-2 font-bold">•</span> Appeals & Tribunals</li>
                                        </ul>
                                        <p className="text-xs md:text-sm text-gray-600 mb-8 leading-relaxed">
                                            Expert advice on income tax compliance, planning, and representation before tax authorities.
                                        </p>
                                    </div>

                                </div>

                            </>
                        )}
                        <div className="col-span-1 md:col-span-2 mt-8 text-center flex justify-center">
                            <button
                                onClick={() => setShowAll(!showAll)}
                                className="bg-[#A07D5A] hover:bg-[#866645] text-white font-medium py-3 px-8 rounded text-sm uppercase tracking-widest transition-colors"
                            >
                                {showAll ? "Show Less" : "Show More"}
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
            

        </div>
    );
}
