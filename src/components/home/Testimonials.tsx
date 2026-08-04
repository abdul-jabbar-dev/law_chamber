import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
    {
        name: "Client Name",
        review: "Exceptional service and results! They handled my case with utmost professionalism.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
    },
    {
        name: "Client Name",
        review: "Highly recommended legal team. They guided me through every step.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"
    },
    {
        name: "Kum Radh",
        review: "They truly care about their clients and fight for the best outcomes.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    }
];

const Testimonials = () => {
    return (
        <section className="py-20 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-12">Client Testimonials</h2>
                
                <div className="flex items-center justify-center gap-4">
                    <button className="bg-white p-2 rounded-full shadow hover:bg-gray-50 text-gray-600 hidden md:block">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((t, i) => (
                            <div key={i} className="bg-white p-8 rounded-xl shadow-sm text-left">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                        <Image src={t.image} alt={t.name} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{t.name}</h4>
                                        <div className="flex text-yellow-400 mt-1">
                                            {[...Array(5)].map((_, j) => (
                                                <Star key={j} className="w-4 h-4 fill-current" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-600 italic">"{t.review}"</p>
                            </div>
                        ))}
                    </div>

                    <button className="bg-white p-2 rounded-full shadow hover:bg-gray-50 text-gray-600 hidden md:block">
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
                
                <div className="flex justify-center gap-2 mt-8">
                    <div className="w-2 h-2 rounded-full bg-[#A07D5A]"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
