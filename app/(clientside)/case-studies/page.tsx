import { Briefcase } from "lucide-react";
import CaseStudiesClient from "./components/CaseStudiesClient";

export const metadata = {
    title: "Case Studies | Advocate Abdullah",
    description: "Discover how Advocate Abdullah has successfully navigated complex legal challenges, securing favorable outcomes for corporations and individuals.",
};

async function getCaseStudies() {
    try {
        const res = await fetch(`${process.env.PUBLIC_API_URL || 'http://localhost:5000/api'}/case-studies`, {
            cache: 'no-store'
        });
        if (!res.ok) {
            return [];
        }
        const data = await res.json();
        return data.success ? data.data : [];
    } catch (error) {
        console.error("Error fetching case studies:", error);
        return [];
    }
}

export default async function CaseStudiesPage() {
    const caseStudies = await getCaseStudies();

    return (
        <div className="w-full min-h-screen bg-gray-50 flex flex-col font-serif relative">
            {/* Header Section */}
            <section className="w-full relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-100 bg-white">
                <div
                    className="absolute inset-0 z-0 opacity-65 pointer-events-none"
                    style={{ backgroundImage: "url('/bg/texture.png')", backgroundSize: "cover", backgroundPosition: "30% 50%" }}
                ></div>

                <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
                    <div className="mb-4 text-center">
                        <div className="inline-flex items-center justify-center gap-2 mb-4">
                            <Briefcase className="w-5 h-5 text-[#A07D5A]" />
                            <span className="text-xs font-bold text-[#A07D5A] uppercase tracking-widest font-sans">Our Proven Track Record</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-wide uppercase">
                            Case <span className="text-[#A07D5A]">Studies</span>
                        </h1>
                        <div className="w-24 h-0.5 bg-[#A07D5A] mx-auto mb-6"></div>
                        <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-600 font-sans leading-relaxed">
                            Discover how Advocate Abdullah has successfully navigated complex legal challenges, securing favorable outcomes for corporations and individuals alike.
                        </p>
                    </div>
                </div>
            </section>

            {/* Client Component handles the grid and the modal */}
            <CaseStudiesClient caseStudies={caseStudies} />
        </div>
    );
}
