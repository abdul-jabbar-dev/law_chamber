"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ZoomIn, Download, X, Loader2, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryClientProps {
    initialItems: any[];
}

export default function GalleryClient({ initialItems }: GalleryClientProps) {
    const [selectedImage, setSelectedImage] = useState<any | null>(null);
    const [isDownloading, setIsDownloading] = useState(false);
    
    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    
    // Pagination Logic
    const totalPages = Math.ceil(initialItems.length / itemsPerPage) || 1;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = initialItems.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNum: number) => {
        setCurrentPage(pageNum);
        const section = document.getElementById("gallery-grid");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

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
        <section id="gallery-grid" className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white scroll-mt-24">
            <div className="max-w-7xl mx-auto">
                
                {/* Pagination Info */}
                {initialItems.length > 0 && (
                    <div className="flex justify-end mb-6">
                        <span className="text-xs text-gray-500 font-sans font-medium">
                            Showing Page {currentPage} of {totalPages} ({initialItems.length} Images)
                        </span>
                    </div>
                )}

                {initialItems.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-gray-500 font-sans">No gallery items found.</p>
                    </div>
                ) : (
                    <>
                        {/* Masonry Layout via CSS Columns */}
                        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                            {currentItems.map((item: any, index: number) => (
                                <div 
                                    key={item._id || index} 
                                    onClick={() => setSelectedImage(item)}
                                    className="group relative overflow-hidden rounded-xl break-inside-avoid shadow-sm hover:shadow-xl transition-all duration-500 ease-in-out cursor-pointer border border-gray-100"
                                >
                                    <div className={`relative w-full h-80 overflow-hidden bg-gray-100`}>
                                        <Image
                                            src={item.image}
                                            alt={item.title || 'Gallery Image'}
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
                                                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US') : ''}
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

                        {/* PAGINATION CONTROLS */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-12 font-sans">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="p-2.5 rounded-lg border border-gray-200 text-gray-700 hover:border-[#A07D5A] hover:text-[#A07D5A] disabled:opacity-30 disabled:cursor-not-allowed transition-colors bg-white shadow-sm flex items-center gap-1 text-xs font-semibold"
                                    aria-label="Previous Page"
                                >
                                    <ChevronLeft className="w-4 h-4" /> Prev
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                    <button
                                        key={pageNum}
                                        onClick={() => handlePageChange(pageNum)}
                                        className={`w-10 h-10 rounded-lg text-xs font-bold transition-all ${currentPage === pageNum
                                            ? "bg-[#A07D5A] text-white shadow-md"
                                            : "bg-white border border-gray-200 text-gray-700 hover:border-[#A07D5A] hover:text-[#A07D5A]"
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                ))}

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="p-2.5 rounded-lg border border-gray-200 text-gray-700 hover:border-[#A07D5A] hover:text-[#A07D5A] disabled:opacity-30 disabled:cursor-not-allowed transition-colors bg-white shadow-sm flex items-center gap-1 text-xs font-semibold"
                                    aria-label="Next Page"
                                >
                                    Next <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

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
                                handleDownload(selectedImage.image, selectedImage.title.replace(/\s+/g, '-').toLowerCase() + '.jpg');
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
                                src={selectedImage.image}
                                alt={selectedImage.title}
                                fill
                                className="object-contain"
                                sizes="(max-width: 1024px) 100vw, 1024px"
                                priority
                            />
                        </div>
                        <div className="absolute -bottom-12 sm:bottom-8 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-center text-white pointer-events-none rounded-b-xl">
                            <h3 className="text-xl sm:text-3xl font-bold tracking-wide drop-shadow-lg">{selectedImage.title}</h3>
                            <p className="text-[#A07D5A] font-sans uppercase tracking-widest text-xs sm:text-sm mt-2 drop-shadow-md">
                                {selectedImage.createdAt ? new Date(selectedImage.createdAt).toLocaleDateString('en-US') : ''}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
