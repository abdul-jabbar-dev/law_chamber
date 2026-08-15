
import TestimonialSlider from './TestimonialSlider';

async function getTestimonials() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${baseUrl}/testimonials`, { next: { revalidate: 60 } });
        const data = await res.json();

        if (data.success && data.data) {
            return data.data;
        }
        return [];
    } catch (error) {
        console.error("Failed to fetch testimonials:", error);
        return [];
    }
}

const Testimonials = async () => {
    const testimonials = await getTestimonials();

    if (!testimonials || testimonials.length === 0) {
        return null;
    }

    return (
        <section className="py-20 bg-[#D9DADB] relative overflow-hidden" style={{ backgroundImage: "url('/img/marble.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="absolute inset-0 bg-white/40 mix-blend-overlay"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                <h2 className="text-4xl font-bold text-gray-900 mb-12">Client Testimonials</h2>
                <TestimonialSlider testimonials={testimonials} />
            </div>
        </section>
    );
};

export default Testimonials;
