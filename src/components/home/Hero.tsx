import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
    return (
        <section className="relative w-full h-[450px] flex items-center">
            {/* Background Image Placeholder */}
            <div className="absolute inset-0 z-0 bg-gray-900">
                <Image
                    src="/img/image.png"
                    alt="Hero Background"
                    fill
                    quality={100}
                    priority
                    className="object-cover object-center z-0"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/10 z-10"></div>
            </div>

            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                        Your Legal Solutions,<br/>Our Professionalism
                    </h1>
                    <p className="text-xl text-gray-200 mb-8">
                        A team of experienced lawyers, by your side at every step.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/consultation" className="bg-[#A07D5A] hover:bg-[#8c6b49] text-white px-8 py-3 rounded font-medium transition-colors border border-[#A07D5A]">
                            Get Free Consultation
                        </Link>
                        <Link href="/appointment" className="bg-transparent border border-white text-white hover:bg-white/10 px-8 py-3 rounded font-medium transition-colors">
                            Book Appointment
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
