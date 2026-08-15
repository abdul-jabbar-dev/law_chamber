"use client";

import { useState } from "react";
import Image from "next/image";
import BookAppointmentBtn from "@/src/components/common/BookAppointmentBtn";
import Link from "next/link";
import { ArrowRight, Quote, X, Target, Lightbulb, Trophy } from "lucide-react";

export default function CaseStudiesClient({ caseStudies }: { caseStudies: any[] }) {
    const [selectedCase, setSelectedCase] = useState<any | null>(null);

    return (
        <div className="w-full flex-grow flex flex-col relative">
            {/* Grid Section */}
            <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 flex-grow relative z-10">
                <div className="max-w-7xl mx-auto">
                    {caseStudies.length === 0 ? (
                        <div className="text-center py-20">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Case Studies Available</h2>
                            <p className="text-gray-500 font-sans">Please check back later for updates to our portfolio.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {caseStudies.map((study: any) => (
                                <div 
                                    onClick={() => setSelectedCase(study)}
                                    key={study._id}
                                    className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                                >
                                    <div className="relative w-full h-56 bg-gray-200 overflow-hidden">
                                        <Image
                                            src={study.image}
                                            alt={study.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-widest font-sans">
                                                {study.practiceArea}
                                            </span>
                                        </div>
                                        {study.featured && (
                                            <div className="absolute top-4 right-4">
                                                <span className="bg-[#A07D5A] text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-widest font-sans">
                                                    Featured
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#A07D5A] transition-colors leading-tight">
                                            {study.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 font-sans line-clamp-3 mb-6">
                                            {study.challenge}
                                        </p>
                                        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                            <span className="text-xs text-gray-500 font-sans font-medium">
                                                {study.clientName || "Confidential Client"}
                                            </span>
                                            <span className="text-[#A07D5A] flex items-center gap-1 text-sm font-semibold font-sans group-hover:gap-2 transition-all">
                                                Read Case <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Testimonial Quote Section */}
            <section className="w-full relative py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-100 overflow-hidden bg-white">
                <div
                    className="absolute inset-0 z-0 opacity-65 pointer-events-none"
                    style={{ backgroundImage: "url('/bg/texture.png')", backgroundSize: "cover", backgroundPosition: "30% 50%" }}
                ></div>

                <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
                    <Quote className="w-16 h-16 text-[#A07D5A] rotate-180 mb-6 opacity-90" strokeWidth={1.5} />
                    <blockquote className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 leading-relaxed mb-6">
                        “They don&apos;t just practice law; they engineer solutions. Their strategic approach saved our company from a devastating lawsuit.”
                    </blockquote>
                    <p className="text-sm md:text-base font-bold text-gray-800 tracking-wide font-sans uppercase">
                        — CEO, Global Tech Solutions
                    </p>
                </div>
            </section>

            {/* FULL CASE STUDY MODAL */}
            {selectedCase && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
                    <div
                        className="absolute inset-0 cursor-pointer"
                        onClick={() => setSelectedCase(null)}
                    ></div>

                    <div className="relative z-10 bg-white rounded-2xl border-2 border-[#A07D5A]/40 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-10 font-serif">
                        <button
                            onClick={() => setSelectedCase(null)}
                            className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors p-1 rounded-full hover:bg-gray-100 cursor-pointer"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="mb-8 pr-8 text-center sm:text-left">
                            <span className="text-xs font-extrabold text-[#A07D5A] uppercase tracking-widest block mb-2 font-sans">
                                {selectedCase.practiceArea}
                            </span>
                            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight mb-2">
                                {selectedCase.title}
                            </h2>
                           {selectedCase.clientName?? <span className="text-xs font-semibold text-gray-500 font-sans uppercase tracking-widest">
                                Last Client: {selectedCase.clientName }
                            </span>}
                        </div>

                        <div className="space-y-8 font-sans">
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                                <div className="w-10 h-10 rounded-full bg-[#A07D5A]/15 text-[#A07D5A] flex items-center justify-center shrink-0">
                                    <Target className="w-5 h-5" strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-widest">
                                        The Challenge
                                    </h3>
                                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                                        {selectedCase.challenge}
                                    </p>
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                                <div className="w-10 h-10 rounded-full bg-[#A07D5A]/15 text-[#A07D5A] flex items-center justify-center shrink-0">
                                    <Lightbulb className="w-5 h-5" strokeWidth={2} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-widest">
                                        Our Solution
                                    </h3>
                                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                                        {selectedCase.solution}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-[#FFFDF5] border-l-4 border-[#A07D5A] p-6 rounded-r-xl shadow-sm border-y border-r border-[#A07D5A]/20 mt-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <Trophy className="w-6 h-6 text-[#A07D5A]" />
                                    <h3 className="text-lg font-bold text-[#A07D5A] uppercase tracking-widest">
                                        The Result
                                    </h3>
                                </div>
                                <p className="text-base text-gray-800 font-medium leading-relaxed whitespace-pre-wrap">
                                    {selectedCase.result}
                                </p>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-8 mt-10 text-center flex flex-col items-center">
                            <p className="text-sm font-semibold text-gray-800 mb-3 font-sans">
                                Facing a similar legal challenge?
                            </p>
                            <BookAppointmentBtn 
                                className="bg-[#A07D5A] hover:bg-[#866645] text-white text-xs md:text-sm font-semibold py-3 px-8 rounded-lg transition-colors shadow-sm font-sans uppercase tracking-widest"
                                onClick={() => setSelectedCase(null)}
                                text="Schedule Consultation"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
