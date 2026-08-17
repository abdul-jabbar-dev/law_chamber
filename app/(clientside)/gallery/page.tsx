import Image from "next/image";
import Link from "next/link";
import BookAppointmentBtn from "@/src/components/common/BookAppointmentBtn";
import { ArrowRight, ImageIcon } from "lucide-react";
import GalleryClient from "./components/GalleryClient";

async function getGalleryItems() {
    try {
        const res = await fetch(`${process.env.PUBLIC_API_URL || 'http://localhost:5000/api'}/gallery`, {
            cache: 'no-store'
        });
        if (!res.ok) {
            return [];
        }
        const data = await res.json();
        return data.success ? data.data : [];
    } catch (error) {
        console.error("Error fetching gallery:", error);
        return [];
    }
}

export default async function GalleryPage() {
    const galleryItems = await getGalleryItems();

    return (
        <div className="w-full min-h-screen bg-gray-50 flex flex-col font-serif relative">
            {/* Header Section */}
            <section className="w-full relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
                <div
                    className="absolute inset-0 z-0 opacity-65 pointer-events-none"
                    style={{ backgroundImage: "url('/bg/texture.png')", backgroundSize: "cover", backgroundPosition: "30% 50%" }}
                ></div>

                <div className="relative z-10 max-w-7xl mx-auto flex flex-col">
                    <div className="mb-12 text-center">
                        <div className="inline-flex items-center justify-center gap-2 mb-4">
                            <ImageIcon className="w-5 h-5 text-[#A07D5A]" />
                            <span className="text-xs font-bold text-[#A07D5A] uppercase tracking-widest font-sans">Our Moments</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-wide uppercase">
                            Firm <span className="text-[#A07D5A]">Gallery</span>
                        </h1>
                        <div className="w-24 h-0.5 bg-[#A07D5A] mx-auto mb-6"></div>
                        <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-600 font-sans leading-relaxed">
                            Take a glimpse into our professional environment, landmark courtroom appearances, corporate events, and the dedicated team that drives our success.
                        </p>
                    </div>
                </div>
            </section>

            {/* Gallery Grid Section via Client Component */}
            <GalleryClient initialItems={galleryItems} />
        </div>
    );
}
