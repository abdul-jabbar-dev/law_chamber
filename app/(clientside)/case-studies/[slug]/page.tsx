import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Target, Lightbulb, Trophy } from "lucide-react";
import BookAppointmentBtn from "@/src/components/common/BookAppointmentBtn";

async function getCaseStudyBySlug(slug: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/case-studies/${slug}`, {
            cache: 'no-store'
        });
        if (!res.ok) {
            return null;
        }
        const data = await res.json();
        return data.success ? data.data : null;
    } catch (error) {
        console.error("Error fetching case study:", error);
        return null;
    }
}

export default async function CaseStudyDetailPage({ params }: { params: { slug: string } }) {
    const caseStudy = await getCaseStudyBySlug(params.slug);

    if (!caseStudy) {
        notFound();
    }

    return (
        <div className="w-full min-h-screen bg-gray-50 flex flex-col font-serif relative">
            {/* Header Banner */}
            <section className="relative w-full h-[40vh] min-h-[300px] bg-black">
                <Image
                    src={caseStudy.image}
                    alt={caseStudy.title}
                    fill
                    className="object-cover opacity-50"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center px-4">
                    <div className="max-w-4xl w-full text-center mt-16">
                        <span className="inline-block px-3 py-1 bg-[#A07D5A] text-white rounded text-xs font-bold uppercase tracking-widest font-sans mb-4">
                            {caseStudy.practiceArea}
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight drop-shadow-md">
                            {caseStudy.title}
                        </h1>
                    </div>
                </div>
            </section>

            <section className="w-full py-12 px-4 sm:px-6 lg:px-8 relative -mt-16 z-10">
                <div className="max-w-4xl mx-auto">

                    {/* Back button */}
                    <div className="mb-6">
                        <Link href="/case-studies" className="inline-flex items-center gap-2 text-white/80 hover:text-white font-sans text-sm font-medium transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to Case Studies
                        </Link>
                    </div>

                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">

                        {/* Meta Info Bar */}
                        <div className="bg-gray-50 border-b border-gray-100 px-8 py-4 flex flex-wrap items-center justify-between gap-4 font-sans text-sm">
                            <div className="flex flex-col">
                                <span className="text-gray-500 font-medium">Client</span>
                                <span className="font-semibold text-gray-900">{caseStudy.clientName || "Confidential"}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-500 font-medium">Date</span>
                                <span className="font-semibold text-gray-900">{new Date(caseStudy.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 sm:p-12 space-y-12">

                            {/* Challenge */}
                            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                                <div className="md:w-1/4 shrink-0">
                                    <div className="flex items-center gap-2 text-[#A07D5A] font-bold uppercase tracking-widest text-sm font-sans">
                                        <Target className="w-5 h-5" />
                                        The Challenge
                                    </div>
                                </div>
                                <div className="md:w-3/4 text-gray-700 leading-relaxed font-sans whitespace-pre-wrap">
                                    {caseStudy.challenge}
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Solution */}
                            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                                <div className="md:w-1/4 shrink-0">
                                    <div className="flex items-center gap-2 text-[#A07D5A] font-bold uppercase tracking-widest text-sm font-sans">
                                        <Lightbulb className="w-5 h-5" />
                                        Our Solution
                                    </div>
                                </div>
                                <div className="md:w-3/4 text-gray-700 leading-relaxed font-sans whitespace-pre-wrap">
                                    {caseStudy.solution}
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Result */}
                            <div className="flex flex-col md:flex-row gap-6 md:gap-12 bg-gray-50 p-6 sm:p-8 rounded-xl border border-gray-100">
                                <div className="md:w-1/4 shrink-0">
                                    <div className="flex items-center gap-2 text-[#A07D5A] font-bold uppercase tracking-widest text-sm font-sans">
                                        <Trophy className="w-5 h-5" />
                                        The Result
                                    </div>
                                </div>
                                <div className="md:w-3/4 text-gray-900 font-medium leading-relaxed font-sans whitespace-pre-wrap text-lg">
                                    {caseStudy.result}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-12 text-center">
                        <p className="text-gray-600 font-sans mb-4">Facing a similar legal challenge?</p>
                        <BookAppointmentBtn
                            className="inline-block px-8 py-3.5 bg-[#A07D5A] hover:bg-[#866645] text-white transition-colors rounded-lg text-xs md:text-sm uppercase tracking-widest font-semibold font-sans"
                            text="Schedule a Consultation"
                        />
                    </div>

                </div>
            </section>
        </div>
    );
}
