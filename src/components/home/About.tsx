import Image from 'next/image';
import Link from 'next/link';

const About = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Image Side */}
                    <div className="w-full md:w-1/2">
                        <div className="relative h-[350px] w-full rounded-lg overflow-hidden shadow-xl">
                            {/* Placeholder for lawyer image */}
                            <div className="w-full h-full bg-gray-300">
                                <Image 
                                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop" 
                                    alt="Lawyer" 
                                    fill 
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                    
                    {/* Text Side */}
                    <div className="w-full md:w-1/2">
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
