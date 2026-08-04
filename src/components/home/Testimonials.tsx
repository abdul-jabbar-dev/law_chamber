"use client";

import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const testimonials = [
    {
        name: "Client Name",
        review: "Exceptional service and results!",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
    },
    {
        name: "Client Nama",
        review: "Highly recommended legal team.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"
    },
    {
        name: "Kum Radh",
        review: "They truly care about their clients.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    },
    {
        name: "Jane Doe",
        review: "Their attention to detail is unmatched.",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop"
    },
    {
        name: "John Smith",
        review: "I felt supported and confident throughout the entire process.",
        image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=200&auto=format&fit=crop"
    }
];

const Testimonials = () => {
    return (
        <section className="py-20 bg-[#D9DADB] relative overflow-hidden" style={{ backgroundImage: "url('/img/marble.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="absolute inset-0 bg-white/40 mix-blend-overlay"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                <h2 className="text-4xl font-bold text-gray-900 mb-12">Client Testimonials</h2>
                
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
                                        <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0">
                                            <Image src={t.image} alt={t.name} fill className="object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-lg">{t.name}</h4>
                                            <div className="flex text-yellow-400 mt-0.5">
                                                {[...Array(5)].map((_, j) => (
                                                    <Star key={j} className="w-4 h-4 fill-current" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-800 font-medium grow font-sans leading-relaxed">&ldquo;{t.review}&rdquo;</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <button className="swiper-button-next-custom absolute right-0 z-20 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-gray-700 hover:text-gray-900 transition-colors cursor-pointer disabled:opacity-50">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
