import ReviewForm from "@/src/components/home/ReviewForm";
import { Star } from "lucide-react";

export const metadata = {
    title: "Leave a Review | Law Chamber",
    description: "Share your experience with our legal services.",
};

export default function LeaveReviewPage() {
    return (
        <div className="w-full min-h-screen bg-[#FAFAFA] flex flex-col text-gray-900 font-serif relative">
            {/* Background Marble Texture */}
            <div
                className="absolute inset-0 z-0 opacity-65 pointer-events-none"
                style={{ backgroundImage: "url('/bg/texture.png')", backgroundSize: "cover", backgroundPosition: "30% 50%" }}
            ></div>

            <section className="relative z-10 w-full py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
                <div className="max-w-4xl mx-auto w-full">
                    <div className="mb-12 text-center">
                        <div className="w-16 h-16 bg-[#A07D5A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Star className="w-8 h-8 text-[#A07D5A]" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1A1A1A] mb-4 tracking-wider uppercase">
                            Client Testimonials
                        </h1>
                        <div className="w-24 h-0.5 bg-[#A07D5A] mx-auto mb-6"></div>
                        <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed font-sans">
                            Your feedback is invaluable to us. Please share your experience working with our firm to help us continue providing exceptional legal representation.
                        </p>
                    </div>

                    <ReviewForm />
                </div>
            </section>
        </div>
    );
}
