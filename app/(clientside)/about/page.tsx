import Image from "next/image";
import Link from "next/link";
import { Scale, Award, Gavel, Building, Trophy, ArrowRight } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="w-full min-h-screen bg-gray-50 flex flex-col font-serif">
            {/* Top Profile & Bio Section */}
            <section className="w-full relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
                {/* Background Marble Texture */}
                <div
                    className="absolute inset-0 z-0 opacity-65 pointer-events-none"
                    style={{ backgroundImage: "url('/bg/texture.png')", backgroundSize: "cover", backgroundPosition: "30% 50%" }}
                ></div>

                <div className="relative z-10 max-w-7xl mx-auto flex flex-col">
                    {/* Header Title */}
                    <div className="mb-16 text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-wide uppercase">
                            Meet Our Senior Associate: <span className="text-[#A07D5A]">Jonathan R. Davies</span>
                        </h1>
                        <div className="w-24 h-0.5 bg-[#A07D5A] mx-auto"></div>
                    </div>

                    {/* Hero Lawyer Profile Card */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-16 bg-white/60 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
                        {/* Lawyer Portrait */}
                        <div className="md:col-span-5 relative w-full h-[360px] md:h-[420px] rounded-xl overflow-hidden shadow-md border border-gray-200">
                            <Image
                                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop"
                                alt="Jonathan R. Davies"
                                fill
                                className="object-cover object-top"
                            />
                        </div>

                        {/* Lawyer Bio Details */}
                        <div className="md:col-span-7 flex flex-col justify-center">
                            <span className="text-xs font-bold text-[#A07D5A] uppercase tracking-widest mb-1 font-sans">
                                Senior Associate
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 tracking-wide">
                                Jonathan R. Davies
                            </h2>
                            <p className="text-sm font-bold text-[#A07D5A] uppercase tracking-wider mb-4 font-sans">
                                Expert in Corporate Law & Litigation
                            </p>
                            <p className="text-sm md:text-base text-gray-600 font-sans leading-relaxed mb-6">
                                Providing strategic legal counsel and aggressive representation for corporate clients, high-net-worth individuals, and emerging enterprises across Bangladesh and international jurisdictions.
                            </p>
                            <div className="flex flex-wrap items-center gap-4">
                                <Link
                                    href="/contact"
                                    className="bg-[#A07D5A] hover:bg-[#866645] text-white text-xs sm:text-sm font-semibold py-3 px-6 rounded-lg transition-colors font-sans uppercase tracking-wider shadow-sm"
                                >
                                    Book Appointment
                                </Link>
                                <a
                                    href="tel:+8801700000000"
                                    className="border border-gray-300 hover:border-[#A07D5A] text-gray-800 hover:text-[#A07D5A] text-xs sm:text-sm font-semibold py-3 px-6 rounded-lg transition-colors font-sans uppercase tracking-wider bg-white"
                                >
                                    Direct Call
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Information Grid (Biography, Expertise & Qualifications) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">

                        {/* LEFT COLUMN: Biography & Key Expertise */}
                        <div className="lg:col-span-8 space-y-8">
                            {/* BIOGRAPHY CARD */}
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
                                <h3 className="text-xl font-bold text-[#A07D5A] uppercase tracking-wider mb-4 border-b border-gray-100 pb-3">
                                    Biography
                                </h3>
                                <p className="text-sm md:text-base text-gray-600 font-sans leading-relaxed mb-4">
                                    Jonathan R. Davies has over 15 years of distinguished experience representing clients in complex commercial litigation, cross-border corporate acquisitions, and regulatory dispute resolution. With a reputation for pragmatic problem-solving, he has successfully handled multi-million dollar arbitration proceedings.
                                </p>
                                <p className="text-sm md:text-base text-gray-600 font-sans leading-relaxed">
                                    Our legacy of proven results and unyielding client dedication guides every case strategy. We focus on transforming legal challenges into favorable commercial outcomes for our valued partners and business enterprises.
                                </p>
                            </div>

                            {/* KEY EXPERTISE CARD */}
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
                                <h3 className="text-xl font-bold text-[#A07D5A] uppercase tracking-wider mb-4 border-b border-gray-100 pb-3">
                                    Key Expertise
                                </h3>
                                <ul className="space-y-3 text-sm md:text-base text-gray-700 font-sans">
                                    <li className="flex items-start">
                                        <span className="text-[#A07D5A] mr-3 font-bold">•</span>
                                        <span>Advised on high-stakes cross-border transactions and international joint ventures.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-[#A07D5A] mr-3 font-bold">•</span>
                                        <span>Successfully litigated complex commercial land and property acquisition disputes.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-[#A07D5A] mr-3 font-bold">•</span>
                                        <span>Represented corporate executive boards during federal white-collar criminal inquiries.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Qualifications & Practice Areas Sidebar */}
                        <div className="lg:col-span-4 bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-8">
                            {/* QUALIFICATIONS */}
                            <div>
                                <h3 className="text-lg font-bold text-[#A07D5A] uppercase tracking-wider mb-4 border-b border-gray-100 pb-3">
                                    Qualifications
                                </h3>
                                <div className="space-y-3 font-sans">
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">Master of Laws (LL.M)</h4>
                                        <p className="text-xs text-gray-500">Harvard Law School | 2018 – 2020</p>
                                    </div>
                                    <div className="pt-2 border-t border-gray-100">
                                        <h4 className="font-bold text-gray-900 text-sm">Bachelor of Laws (LL.B Honors)</h4>
                                        <p className="text-xs text-gray-500">Dhaka University Law Faculty | 2014 – 2018</p>
                                    </div>
                                </div>
                            </div>

                            {/* SELECTED PRACTICE AREAS */}
                            <div className="pt-4 border-t border-gray-100">
                                <h3 className="text-lg font-bold text-[#A07D5A] uppercase tracking-wider mb-4 border-b border-gray-100 pb-3">
                                    Selected Services
                                </h3>
                                <ul className="space-y-2 text-sm text-gray-800 font-sans font-medium">
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-[#A07D5A] rounded-full"></span>
                                        Corporate Law & Litigation
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-[#A07D5A] rounded-full"></span>
                                        Criminal Defense & Fraud Audit
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-[#A07D5A] rounded-full"></span>
                                        Commercial Real Estate & Property
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-[#A07D5A] rounded-full"></span>
                                        Family Law & Estate Planning
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>



                </div>
            </section>

            {/* SECTION 2: Firm & Team Highlights */}
            <section className="w-full relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-100 overflow-hidden">
                <div
                    className="absolute inset-0 z-0 opacity-65 pointer-events-none"
                    style={{ backgroundImage: "url('/bg/texture.png')", backgroundSize: "cover", backgroundPosition: "30% 50%" }}
                ></div>

                <div className="relative z-10 max-w-7xl mx-auto flex flex-col">
                    {/* Header */}
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-wide uppercase">
                            Firm & Team Highlights
                        </h2>
                        <div className="w-24 h-0.5 bg-[#A07D5A] mx-auto"></div>
                    </div>

                    {/* Team Members & Partner Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-16">

                        {/* Doniall Harma Card */}
                        <div className="md:col-span-4 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-6 flex flex-col items-center text-center">
                            <div className="relative w-full h-60 rounded-lg overflow-hidden mb-4 border border-gray-200">
                                <Image
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
                                    alt="Doniall Harma"
                                    fill
                                    className="object-cover object-top"
                                />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-0.5">Doniall Harma</h3>
                            <p className="text-xs font-semibold text-gray-500 font-sans mb-4">Senior Associate - Corporate Law</p>
                            <div className="flex items-center gap-4 text-xs text-[#A07D5A] font-semibold font-sans pt-3 border-t border-gray-100 w-full justify-center">
                                <Link href="/contact" className="hover:underline">Full profile</Link>
                                <span>•</span>
                                <a href="tel:+8801700000000" className="hover:underline">Phone</a>
                                <span>•</span>
                                <a href="mailto:info@lawfirm.com" className="hover:underline">Email</a>
                            </div>
                        </div>

                        {/* Gerahan Fitan Card */}
                        <div className="md:col-span-4 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-6 flex flex-col items-center text-center">
                            <div className="relative w-full h-60 rounded-lg overflow-hidden mb-4 border border-gray-200">
                                <Image
                                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop"
                                    alt="Gerahan Fitan"
                                    fill
                                    className="object-cover object-top"
                                />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-0.5">Gerahan Fitan</h3>
                            <p className="text-xs font-semibold text-gray-500 font-sans mb-4">Associate - Family Law</p>
                            <div className="flex items-center gap-4 text-xs text-[#A07D5A] font-semibold font-sans pt-3 border-t border-gray-100 w-full justify-center">
                                <Link href="/contact" className="hover:underline">Full profile</Link>
                                <span>•</span>
                                <a href="tel:+8801700000000" className="hover:underline">Phone</a>
                                <span>•</span>
                                <a href="mailto:info@lawfirm.com" className="hover:underline">Email</a>
                            </div>
                        </div>

                        {/* Key Partner Box */}
                        <div className="md:col-span-4 bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
                            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                                <div>
                                    <h4 className="font-bold text-gray-900 text-base">Key Partner</h4>
                                    <p className="text-xs text-gray-500 font-sans">Senior Legal Governance</p>
                                </div>
                                <div className="w-10 h-10 bg-[#A07D5A]/10 rounded-lg flex items-center justify-center text-[#A07D5A]">
                                    <Award className="w-5 h-5" />
                                </div>
                            </div>

                            <div className="relative w-full h-40 rounded-lg overflow-hidden border border-gray-200">
                                <Image
                                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop"
                                    alt="Sham Partner"
                                    fill
                                    className="object-cover object-top"
                                />
                            </div>

                            <div className="space-y-2 text-xs font-sans">
                                <div className="flex justify-between py-1.5 border-b border-gray-100">
                                    <span className="text-gray-500">Firm Values</span>
                                    <span className="font-bold text-gray-800">Integrity & Excellence</span>
                                </div>
                                <div className="flex justify-between py-1.5 border-b border-gray-100">
                                    <span className="text-gray-500">Track Record</span>
                                    <span className="font-bold text-gray-800">99% Success Rate</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Circular Badge Icons Row */}
                    <div className="flex items-center justify-center gap-6 md:gap-12 mb-16">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#A07D5A]/15 border-2 border-[#A07D5A]/30 flex items-center justify-center text-[#A07D5A] shadow-sm">
                            <Award className="w-7 h-7" />
                        </div>
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#A07D5A]/15 border-2 border-[#A07D5A]/30 flex items-center justify-center text-[#A07D5A] shadow-sm">
                            <Gavel className="w-7 h-7" />
                        </div>
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#A07D5A]/15 border-2 border-[#A07D5A]/30 flex items-center justify-center text-[#A07D5A] shadow-sm">
                            <Scale className="w-7 h-7" />
                        </div>
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#A07D5A]/15 border-2 border-[#A07D5A]/30 flex items-center justify-center text-[#A07D5A] shadow-sm">
                            <Building className="w-7 h-7" />
                        </div>
                    </div>

                    {/* Key Achievements Card */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 max-w-4xl mx-auto w-full">
                        <h3 className="text-xl font-bold text-[#A07D5A] uppercase tracking-wider mb-6 border-b border-gray-100 pb-3 flex items-center gap-3">
                            <Trophy className="w-6 h-6 text-[#A07D5A]" />
                            Key Achievements
                        </h3>
                        <ul className="space-y-4 text-sm md:text-base text-gray-700 font-sans">
                            <li className="flex items-start gap-3">
                                <Trophy className="w-5 h-5 text-[#A07D5A] shrink-0 mt-0.5" />
                                <span>Advised on cross-border transactions valued in excess of $100 Million USD.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Trophy className="w-5 h-5 text-[#A07D5A] shrink-0 mt-0.5" />
                                <span>Successfully litigated landmark commercial property dispute in Supreme Court.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Trophy className="w-5 h-5 text-[#A07D5A] shrink-0 mt-0.5" />
                                <span>Negotiated out-of-court settlements protecting core IP for Fortune 500 tech clients.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Trophy className="w-5 h-5 text-[#A07D5A] shrink-0 mt-0.5" />
                                <span>Awarded Top Commercial Litigator of the Year by Asian Legal Excellence Forum.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Trophy className="w-5 h-5 text-[#A07D5A] shrink-0 mt-0.5" />
                                <span>Successfully defended major banking institution in full regulatory compliance audit.</span>
                            </li>
                        </ul>
                    </div>

                </div>
            </section>

            {/* Bottom CTA Banner */}
            <section className="w-full bg-[#1E1B18] py-16 px-4 sm:px-6 text-center text-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-4xl font-bold mb-4 tracking-wide text-white">
                        Ready to Discuss Your Legal Matters with Jonathan R. Davies?
                    </h2>
                    <p className="text-sm md:text-base text-gray-300 font-sans mb-8 max-w-xl mx-auto">
                        Partner with an experienced legal advocate dedicated to delivering high-impact solutions for your case.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/contact"
                            className="w-full sm:w-auto px-8 py-3.5 bg-[#A07D5A] hover:bg-[#866645] text-white transition-colors rounded-lg text-xs md:text-sm uppercase tracking-widest font-semibold font-sans"
                        >
                            Schedule An Appointment
                        </Link>
                        <Link
                            href="/practice-areas"
                            className="w-full sm:w-auto px-8 py-3.5 bg-[#A07D5A] hover:bg-[#866645] text-white transition-colors rounded-lg text-xs md:text-sm uppercase tracking-widest font-semibold font-sans flex items-center justify-center gap-2"
                        >
                            See Full Team <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
