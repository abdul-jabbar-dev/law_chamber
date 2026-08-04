"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote, X, Shield } from "lucide-react";

interface CaseStudy {
    id: number;
    category: string;
    title: string;
    description: string;
    image: string;
    challenge: string;
    strategy: string;
    outcome: string;
}

const caseStudies: CaseStudy[] = [
    {
        id: 1,
        category: "CORPORATE LITIGATION",
        title: "Multi-Million Dollar Merger Dispute",
        description: "Successfully defended a leading tech firm in a high-stakes merger dispute, securing a favorable settlement out of court and protecting their core assets.",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=600&auto=format&fit=crop",
        challenge: "Our client, a leading regional tech firm, was facing a sudden, hostile takeover attempt by a larger competitor. This threatened their core intellectual property and the operational control of the founders.",
        strategy: "We swiftly filed for emergency injunctions and conducted a deep-dive audit of the competitor's regulatory compliance. Our team leveraged complex corporate governance laws to stall the takeover while restructuring our client's shareholder agreements.",
        outcome: "Successfully halted the hostile takeover. We secured a highly favorable out-of-court settlement that completely protected the client's intellectual property and maintained their independent operational control."
    },
    {
        id: 2,
        category: "PROPERTY LAW",
        title: "Commercial Complex Acquisition",
        description: "Facilitated a seamless $50M commercial property acquisition, navigating complex zoning laws and ensuring 100% regulatory compliance.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop",
        challenge: "Acquiring a prime $50M commercial estate involved navigating multi-layered environmental regulations, municipal zoning restrictions, and tenant lease restructuring under tight deadlines.",
        strategy: "Our property law team performed rigorous due diligence, negotiated lease terms, and liaised directly with city planners to obtain all necessary permits ahead of closing.",
        outcome: "Completed the acquisition on schedule with zero regulatory violations, securing long-term lease stability and maximizing client asset ROI."
    },
    {
        id: 3,
        category: "WHITE-COLLAR DEFENSE",
        title: "Executive Fraud Acquittal",
        description: "Provided a robust, data-driven defense strategy for a corporate executive, resulting in a complete dismissal of all federal fraud charges.",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=600&auto=format&fit=crop",
        challenge: "A corporate C-suite executive faced federal allegations of financial misrepresentation and fraud, threatening severe criminal penalties and reputational ruin.",
        strategy: "We conducted a forensic accounting audit, debunked prosecution key witnesses, and demonstrated that financial discrepancies resulted from system software errors rather than criminal intent.",
        outcome: "Achieved a full dismissal of all charges prior to trial, completely restoring the executive's professional standing and clearing all records."
    },
    {
        id: 4,
        category: "CORPORATE LITIGATION",
        title: "Intellectual Property Defense",
        description: "Protected a biotech company's patented medical technology against aggressive infringement claims from an international conglomerate.",
        image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=600&auto=format&fit=crop",
        challenge: "An international competitor filed patent invalidation suits across multiple jurisdictions to block our client's groundbreaking medical device launch.",
        strategy: "Our IP litigation experts coordinated a global defense strategy, establishing prior art validity and counter-suing for bad-faith litigation tactics.",
        outcome: "Secured multi-jurisdictional victories, validating all patents and compelling the competitor to pay substantial licensing royalties to our client."
    },
    {
        id: 5,
        category: "PROPERTY LAW",
        title: "Real Estate Development Dispute",
        description: "Resolved high-profile land ownership disputes for a major residential infrastructure development project.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop",
        challenge: "Conflicting land title claims stalled a $120M multi-family housing development, causing millions in delayed construction penalties.",
        strategy: "We uncovered historical land registry archives to prove uninterrupted title ownership and successfully mediated equitable boundary adjustments.",
        outcome: "Cleared land titles within 60 days, allowing construction to resume without financial losses or prolonged court litigation."
    },
    {
        id: 6,
        category: "WHITE-COLLAR DEFENSE",
        title: "Regulatory Compliance Audit Defense",
        description: "Represented a national financial institution during an intense regulatory investigation into international transaction protocols.",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=600&auto=format&fit=crop",
        challenge: "Federal regulators issued subpoenas regarding cross-border capital transactions, threatening heavy institutional fines and banking license suspension.",
        strategy: "Our white-collar defense attorneys instituted immediate internal compliance overhauls and presented transparent, auditable evidence of institutional good faith.",
        outcome: "Resolved the regulatory inquiry with zero fines or sanctions, establishing the bank's compliance program as an industry benchmark."
    },
];

export default function CaseStudyPage() {
    const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

    return (
        <div className="w-full min-h-screen bg-gray-50 flex flex-col">
            {/* Main Section with Marble Texture */}
            <section className="w-full relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
                {/* Background Marble Texture */}
                <div
                    className="absolute inset-0 z-0 opacity-65 pointer-events-none"
                    style={{ backgroundImage: "url('/bg/texture.png')", backgroundSize: "cover", backgroundPosition: "30% 50%" }}
                ></div>

                <div className="relative z-10 max-w-7xl mx-auto flex flex-col">
                    {/* Header */}
                    <div className="mb-16 text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-wide uppercase">
                            Proven Track Record of Success
                        </h1>
                        <div className="w-24 h-0.5 bg-[#A07D5A] mx-auto mb-6"></div>
                        <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                            Real challenges, real results. Explore how our strategic legal approach delivers favorable outcomes for our clients across various industries.
                        </p>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                        {caseStudies.map((caseItem) => (
                            <div
                                key={caseItem.id}
                                className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full"
                            >
                                {/* Card Image */}
                                <div className="relative w-full h-52 overflow-hidden bg-gray-100">
                                    <Image
                                        src={caseItem.image}
                                        alt={caseItem.title}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                {/* Card Body */}
                                <div className="p-6 md:p-8 flex flex-col flex-grow justify-between">
                                    <div>
                                        <span className="text-xs font-bold text-[#A07D5A] uppercase tracking-widest mb-3 block">
                                            {caseItem.category}
                                        </span>
                                        <h2 className="text-xl font-bold text-gray-900 mb-3 leading-snug">
                                            {caseItem.title}
                                        </h2>
                                        <p className="text-xs md:text-sm text-gray-600 mb-6 leading-relaxed">
                                            {caseItem.description}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => setSelectedCase(caseItem)}
                                        className="bg-[#A07D5A] hover:bg-[#866645] text-white text-xs md:text-sm font-semibold py-2.5 px-5 rounded-lg transition-colors flex items-center gap-2 self-start mt-auto cursor-pointer"
                                    >
                                        Read Full Case
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonial Quote Section */}
            <section className="w-full relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-100 overflow-hidden">
                <div
                    className="absolute inset-0 z-0 opacity-65 pointer-events-none"
                    style={{ backgroundImage: "url('/bg/texture.png')", backgroundSize: "cover", backgroundPosition: "30% 50%" }}
                ></div>

                <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
                    <Quote className="w-16 h-16 text-[#A07D5A] rotate-180 mb-6 opacity-90" strokeWidth={1.5} />
                    <blockquote className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 leading-relaxed mb-6">
                        “They don&apos;t just practice law; they engineer solutions. Their strategic approach saved our company from a devastating lawsuit.”
                    </blockquote>
                    <p className="text-sm md:text-base font-bold text-gray-800 tracking-wide">
                        — CEO, Global Tech Solutions
                    </p>
                </div>
            </section>

            {/* FULL CASE STUDY MODAL */}
            {selectedCase && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
                    {/* Backdrop Click to Close */}
                    <div
                        className="absolute inset-0"
                        onClick={() => setSelectedCase(null)}
                    ></div>

                    {/* Modal Content Box */}
                    <div className="relative z-10 bg-white rounded-2xl border-2 border-[#A07D5A]/40 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-10">
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedCase(null)}
                            className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors p-1 rounded-full hover:bg-gray-100 cursor-pointer"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Modal Header */}
                        <div className="mb-6 pr-8">
                            <span className="text-xs font-extrabold text-[#A07D5A] uppercase tracking-widest block mb-1">
                                {selectedCase.category}
                            </span>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                                {selectedCase.title}
                            </h2>
                        </div>

                        {/* Modal Content Points */}
                        <div className="space-y-6">
                            {/* Point 1: The Challenge */}
                            <div className="flex items-start gap-4">
                                <div className="w-9 h-9 rounded-full bg-[#A07D5A]/15 text-[#A07D5A] flex items-center justify-center shrink-0 mt-0.5">
                                    <X className="w-5 h-5" strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">
                                        The Challenge
                                    </h3>
                                    <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                                        {selectedCase.challenge}
                                    </p>
                                </div>
                            </div>

                            {/* Point 2: Our Strategic Approach */}
                            <div className="flex items-start gap-4">
                                <div className="w-9 h-9 rounded-full bg-[#A07D5A]/15 text-[#A07D5A] flex items-center justify-center shrink-0 mt-0.5">
                                    <Shield className="w-5 h-5" strokeWidth={2} />
                                </div>
                                <div>
                                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">
                                        Our Strategic Approach
                                    </h3>
                                    <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                                        {selectedCase.strategy}
                                    </p>
                                </div>
                            </div>

                            {/* Point 3: The Outcome (Highlighted Box) */}
                            <div className="bg-[#FFFDF5] border-l-4 border-[#A07D5A] p-5 rounded-r-xl shadow-xs border-y border-r border-[#A07D5A]/20">
                                <h3 className="text-base md:text-lg font-bold text-[#A07D5A] mb-1">
                                    The Outcome
                                </h3>
                                <p className="text-xs md:text-sm text-gray-800 font-medium leading-relaxed">
                                    {selectedCase.outcome}
                                </p>
                            </div>
                        </div>

                        {/* Modal Footer / CTA */}
                        <div className="border-t border-gray-200 pt-6 mt-8 text-center flex flex-col items-center">
                            <p className="text-sm font-semibold text-gray-800 mb-3">
                                Facing a similar legal challenge?
                            </p>
                            <Link
                                href="/contact"
                                className="bg-[#A07D5A] hover:bg-[#866645] text-white text-xs md:text-sm font-semibold py-3 px-8 rounded-lg transition-colors shadow-sm"
                            >
                                Discuss Your Case With Us
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
