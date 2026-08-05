"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ImageIcon, X, ZoomIn, Download, Loader2 } from "lucide-react";

type GalleryItem = {
    id: number;
    title: string;
    category: string;
    imageUrl: string;
    height: string;
};

const galleryItems: GalleryItem[] = [
    {
        id: 1,
        title: "Supreme Court Hearing",
        category: "Courtroom",
        imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
        height: "h-64",
    },
    {
        id: 2,
        title: "Corporate Meeting",
        category: "Corporate",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
        height: "h-96",
    },
    {
        id: 3,
        title: "Our Justice Gavel",
        category: "Symbol",
        imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
        height: "h-72",
    },
    {
        id: 4,
        title: "Closing the Deal",
        category: "Corporate",
        imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800&auto=format&fit=crop",
        height: "h-80",
    },
    {
        id: 5,
        title: "Headquarters",
        category: "Office",
        imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
        height: "h-96",
    },
    {
        id: 6,
        title: "Annual Legal Seminar",
        category: "Event",
        imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
        height: "h-64",
    },
    {
        id: 7,
        title: "Lead Attorney",
        category: "Team",
        imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
        height: "h-80",
    },
    {
        id: 8,
        title: "Client Consultation",
        category: "Consultation",
        imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop",
        height: "h-72",
    }
];

export default function GalleryPage() {
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async (url: string, filename: string) => {
        try {
            setIsDownloading(true);
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = filename || 'download';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("Failed to download image", error);
        } finally {
            setIsDownloading(false);
        }
    };

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

            {/* Gallery Grid Section */}
            <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    {/* Masonry Layout via CSS Columns */}
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                        {galleryItems.map((item, index) => (
                            <div 
                                key={item.id} 
                                onClick={() => setSelectedImage(item)}
                                className="group relative overflow-hidden rounded-xl break-inside-avoid shadow-sm hover:shadow-xl transition-all duration-500 ease-in-out cursor-pointer border border-gray-100"
                            >
                                <div className={`relative w-full ${item.height} overflow-hidden bg-gray-100`}>
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        priority={index < 4}
                                    />
                                    
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    
                                    {/* Content inside overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex justify-between items-end">
                                        <div>
                                            <span className="text-xs font-bold text-[#A07D5A] uppercase tracking-widest font-sans block mb-1">
                                                {item.category}
                                            </span>
                                            <h3 className="text-lg md:text-xl font-bold text-white tracking-wide">
                                                {item.title}
                                            </h3>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shrink-0 hover:bg-[#A07D5A] transition-colors">
                                            <ZoomIn className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA Banner */}
            <section className="w-full bg-[#1E1B18] py-16 px-4 sm:px-6 text-center text-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-4xl font-bold mb-4 tracking-wide text-white">
                        Require Legal Representation?
                    </h2>
                    <p className="text-sm md:text-base text-gray-300 font-sans mb-8 max-w-xl mx-auto">
                        Our seasoned attorneys are ready to provide you with the strategic legal counsel you need.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/contact"
                            className="w-full sm:w-auto px-8 py-3.5 bg-[#A07D5A] hover:bg-[#866645] text-white transition-colors rounded-lg text-xs md:text-sm uppercase tracking-widest font-semibold font-sans"
                        >
                            Schedule Consultation
                        </Link>
                        <Link
                            href="/practice-areas"
                            className="w-full sm:w-auto px-8 py-3.5 border border-white/20 hover:border-white/50 bg-transparent text-white transition-colors rounded-lg text-xs md:text-sm uppercase tracking-widest font-semibold font-sans flex items-center justify-center gap-2"
                        >
                            Explore Practices <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="absolute top-4 right-4 sm:top-8 sm:right-8 flex gap-3 z-[101]">
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDownload(selectedImage.imageUrl, selectedImage.title.replace(/\s+/g, '-').toLowerCase() + '.jpg');
                            }}
                            disabled={isDownloading}
                            className="text-white/70 hover:text-white hover:bg-white/10 transition-all bg-black/40 p-3 rounded-full disabled:opacity-50"
                            title="Download Image"
                        >
                            {isDownloading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Download className="w-6 h-6" />}
                        </button>
                        <button 
                            onClick={() => setSelectedImage(null)}
                            className="text-white/70 hover:text-white hover:bg-white/10 transition-all bg-black/40 p-3 rounded-full"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    
                    <div 
                        className="relative w-full max-w-5xl h-[70vh] sm:h-[85vh] flex flex-col items-center justify-center animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative w-full h-full">
                            <Image
                                src={selectedImage.imageUrl}
                                alt={selectedImage.title}
                                fill
                                className="object-contain"
                                sizes="(max-width: 1024px) 100vw, 1024px"
                                priority
                            />
                        </div>
                        <div className="absolute -bottom-12 sm:bottom-8 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-center text-white pointer-events-none rounded-b-xl">
                            <h3 className="text-xl sm:text-3xl font-bold tracking-wide drop-shadow-lg">{selectedImage.title}</h3>
                            <p className="text-[#A07D5A] font-sans uppercase tracking-widest text-xs sm:text-sm mt-2 drop-shadow-md">{selectedImage.category}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
