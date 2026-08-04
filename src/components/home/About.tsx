import Image from 'next/image';
import Link from 'next/link';

const About = () => {
    return (
        <section className="py-20 bg-gray-100 relative overflow-hidden">
            {/* Background Texture with Opacity */}
            <div
                className="absolute inset-0 z-0 opacity-65 "
                style={{ backgroundImage: "url('/bg/texture.png')", backgroundSize: " ", backgroundPosition: "30% 50%" }}
            ></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Image Side */}
                    <div className="w-full md:w-2/5">
                        <div className="relative h-75 w-full rounded-lg overflow-hidden shadow-xl">
                            {/* Placeholder for lawyer image */}
                            <div className="w-full h-full bg-gray-300">
                                <Image
                                    src="/img/profile.png"
                                    alt="Lawyer"
                                    fill
                                    className="object-cover scale-[1.25] "
                                />
                            </div>
                        </div>
                    </div>

                    {/* Text Side */}
                    <div className="w-full md:w-3/5">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">About Me</h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Our firm is dedicated to providing expert legal counsel and representation with a track record of success across diverse practice areas. We believe in justice, integrity, and achieving the best possible outcomes for our clients.
                        </p>
                        <Link href="/about" className="inline-block bg-[#A07D5A] hover:bg-[#8c6b49] text-white px-8 py-3 rounded font-medium transition-colors">
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
