import Link from 'next/link';

const CTA = () => {
    return (
        <section className="py-20 bg-[#A07D5A] text-white text-center">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold mb-6">Need Free Consultation?</h2>
                <p className="text-lg mb-8 text-white/90">
                    Looking for expert legal advice? Connect with our dedicated team today for a confidential discussion about your specific legal matters.
                </p>
                <div className="flex justify-center gap-4">
                    <Link href="/contact" className="bg-white text-[#A07D5A] hover:bg-gray-100 px-8 py-3 rounded font-medium transition-colors">
                        Call Us
                    </Link>
                    <Link href="/appointment" className="bg-transparent border border-white text-white hover:bg-white/10 px-8 py-3 rounded font-medium transition-colors">
                        Book Appointment
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CTA;
