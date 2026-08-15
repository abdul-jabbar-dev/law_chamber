"use client";

import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function TestimonialSlider({ testimonials }: { testimonials: any[] }) {
    return (
        <div className="relative px-2 md:px-16 flex items-center justify-center">
            <button className="swiper-button-prev-custom absolute left-0 z-20 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-gray-700 hover:text-gray-900 transition-colors cursor-pointer disabled:opacity-50">
                <ChevronLeft className="w-5 h-5" />
            </button>

            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                navigation={{
                    prevEl: '.swiper-button-prev-custom',
                    nextEl: '.swiper-button-next-custom',
                }}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                className="w-full pb-16"
                style={{
                    "--swiper-pagination-color": "#A07D5A",
                    "--swiper-pagination-bullet-inactive-color": "#A07D5A",
                    "--swiper-pagination-bullet-inactive-opacity": "0.4",
                } as React.CSSProperties}
            >
                {testimonials.map((t, i) => (
                    <SwiperSlide key={i} className="h-auto">
                        <div className="bg-white p-6 rounded-xl shadow-md text-left h-full flex flex-col">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border border-gray-100">
                                    {t.image ? (
                                        <Image src={t.image} alt={t.name} fill className="object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-xl">
                                            {t.name.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-lg">{t.name}</h4>
                                    <div className="flex text-yellow-400 mt-0.5">
                                        {[...Array(5)].map((_, j) => (
                                            <Star key={j} className={`w-4 h-4 ${j < (t.rating || 5) ? 'fill-current' : 'text-gray-300'}`} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-800 font-medium grow font-sans leading-relaxed">&ldquo;{t.message || t.review}&rdquo;</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <button className="swiper-button-next-custom absolute right-0 z-20 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-gray-700 hover:text-gray-900 transition-colors cursor-pointer disabled:opacity-50">
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}
